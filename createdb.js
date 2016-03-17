var r = require('rethinkdb');

var connection = null;

r.connect({host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
}).then(function () {
    r.dbCreate('realtimerating').run(connection, function(err, result) {
        if (err) throw err;
    });
}).then(function () {
    r.db('realtimerating').tableCreate('ratings').run(connection, function(err, result) {
        if (err) throw err;
    });
});
