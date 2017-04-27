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
        $('#p-my-name').text(username);
        socket.emit('DANG_KY_USER', username);
    });
    socket.on('XAC_NHAN_DANG_KY', listHandler(socket));

    $('#ul-user').on('click', 'div', function () {
        const socketId = $(this).attr('id');
        const name = $(this).html();
        alert('Bạn đang gọi cho ' + name);
        $('#tr-video').append(`
            <td border="1" width="50%">
                <div class="div-my-name">${name}</div>
                <video style="width:345px; height:300px; margin:0; padding:0"></video>
            </td>
        `);
        call(socket, socketId);
    });

    socket.on('SOMEONE_CALL', data => onReceiveSignal(socket, data));
});
