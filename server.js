var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var r = require('rethinkdb');

var app = express();
var server = http.Server(app);
var io = socketio(server);


var THRESHOLD = 10000;


r.connect({host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    main(conn);
});


function main (connection) {
    app.use('/static', express.static(__dirname + '/static'));

    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/index.html');
    });

    io.on('connection', function (socket) {

        r.db('realtimerating').table('ratings')
            .filter(r.row('created_at').gt(r.now().sub(THRESHOLD)))
            .orderBy('created_at')
            .run(conn)
            .then(function (cursor) {
                cursor.each(function(err, item) {
                    socket.emit('new_vote', item);
                });
            });

        console.log('a user connected');

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('vote', function (message) {
            console.log('> ', message);
            r.db('realtimerating').table('ratings').insert({
                created_at: r.now(),
                vote: message
            }).run(conn);
        });

    });

    r.db('realtimerating').table('ratings')
        .changes()
        .run(conn)
        .then(function (cursor) {
            cursor.each(function(err, item) {
                io.sockets.emit('new_vote', item.new_val);
            });
        });

    server.listen(8008);
}
