# Intro
`realtime-rating` is an app to give real time feedback about a talk. The audience can connect to it and start giving feedback by tapping on the "reactions" displayed (or adding new ones).

It looks a like this:

![](http://i.imgur.com/GpANWeO.jpg)

I presented it at the [RealTime Web Lightning Talks](http://www.meetup.com/Berlin-Realtime-Web-Meetup/events/228632661/) and the audience casted something like 900 votes and it ended up like:

```json
[
    {
        "count":220,
        "vote":"Trump for president "
    },
    {
        "count":106,
        "vote":"💩"
    },
    {
        "count":84,
        "vote":"💓"
    },
    {
        "count":77,
        "vote":"talk lauder please"
    },
    {
        "count":75,
        "vote":"😬"
    },
    {
        "count":71,
        "vote":"Gross"
    },
    {
        "count":60,
        "vote":"😁"
    },
    {
        "count":50,
        "vote":"Well... "
    },
    {
        "count":41,
        "vote":"😸"
    },
    {
        "count":20,
        "vote":"👍"
    },
    {
        "count":18,
        "vote":"Hey!"
    },
    {
        "count":18,
        "vote":"Kool"
    },
    {
        "count":15,
        "vote":":("
    },
    {
        "count":9,
        "vote":""
    },
    {
        "count":9,
        "vote":"angst"
    },
    {
        "count":7,
        "vote":"indifference"
    },
    {
        "count":2,
        "vote":"NOP"
    }
]
```

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

Now you can start the server with:
```bash
$ npm start
```

You should be able to connect to http://localhost:8008/. There is an almost
invisible box at the bottom left, type something there and hit enter.

