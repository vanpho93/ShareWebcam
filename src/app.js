const $ = require('jquery');
const io = require('socket.io-client');
const listHandler = require('./listHandler');
const call = require('./call');
const onReceiveSignal = require('./onReceiveSignal');

$('document').ready(() => {
    const socket = io();
    $('#div-chat').hide();
    $('#btn-dang-ky').click(() => {
        const username = $('#txt-username').val();
        socket.emit('DANG_KY_USER', username);
    });
    socket.on('XAC_NHAN_DANG_KY', listHandler(socket));

    $('#ul-user').on('click', 'li', function () {
        const socketId = $(this).attr('id');
        call(socket, socketId);
    });

    socket.on('SOMEONE_CALL', data => onReceiveSignal(socket, data));
});
