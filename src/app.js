const $ = require('jquery');
const io = require('socket.io-client');
const listHandler = require('./listHandler');

$('document').ready(() => {
    const socket = io();
    $('#div-chat').hide();
    $('#btn-dang-ky').click(() => {
        const username = $('#txt-username').val();
        socket.emit('DANG_KY_USER', username);
    });
    socket.on('XAC_NHAN_DANG_KY', listHandler(socket));
});
