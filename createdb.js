var r = require('rethinkdb');


var connection = null;

r.connect({host: 'localhost', port: 28015})
    .then(function (conn) {
        connection = conn;
        return r.dbCreate('realtimerating').run(connection);
    })
    .then(function () {
        return r.db('realtimerating').tableCreate('ratings').run(connection);
    })
    .error(function (err) {
        throw err;
    })
    .finally(function () {
        connection.close();
    });

