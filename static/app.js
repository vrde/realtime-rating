var THRESHOLD = 10000;
var socket = io();
var votes = {};
var score = {};
var delta = 0;


function getCleanupTime () {
    return new Date(new Date().getTime() - THRESHOLD).toISOString();
}


function castVote (event) {
    var message = $(this).data('id');
    socket.emit('vote', message);
}

function recalculateVotes () {
    for (var vote in votes) {
        votes[vote] = votes[vote].filter(function (m) { return m.created_at > getCleanupTime(); });
        score[vote] = votes[vote].length;
    }
    console.log(votes);
    renderVotes();
}

function createVote (vote) {
    var label = $('<div></div>').addClass('label').text(vote);
    var bar = $('<div></div>').addClass('bar');
    var element = $('<div></div>').addClass('vote').attr({'data-id': vote});
    element.append(label);
    element.append(bar);
    $('#container').append(element);
    element.on('click', castVote);
    return element;
}

function renderVotes () {
    for (var vote in votes) {
        var update = $('#container div[data-id="' + vote + '"');
        var perc = Math.round(100 * score[vote] / 25);

        if (!update.length) {
            update = createVote(vote);
        }

        update.find('.bar').css({'width': perc + '%'});
        //+ ' ' + score[vote]);
    }
}

function bindRecvSocket () {
    socket.on('new_vote', function (message) {
        var vote = message.vote;

        if (!votes[vote]) {
            votes[vote] = [];
        }

        votes[vote].push(message);
        recalculateVotes();
    });
}

function main () {
    bindRecvSocket();
    window.setInterval(recalculateVotes, 1000);
    $('form').on('submit', function () {
        socket.emit('vote', $('input').val());
        $('input').val('');
        return false;
    });
}


main();

