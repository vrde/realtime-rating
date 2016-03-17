# realtime-votes
A demo built on top of RethinkDB, socket.io, and Express.

# Install
Clone this repo, then:
```bash
$ npm install
```

Make sure your RethinkDB is running, then execute:

Create the database and the table:

```bash
$ node createdb.js
```

(you might need to `ctrl+c`, for whatever reason in hangs)


Now you can start the server with:
```bash
$ npm start
```

You should be able to connect to http://localhost:8008/. There is an almost
invisible box at the bottom left, type something there and hit enter.

