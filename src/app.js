const $ = require('jquery');
const io = require('socket.io-client');

const renderList = require('./util/renderListUser');
const addUserToList = require('./util/addUserToList');

$('document').ready(() => {
    const socket = io();
    $('#div-chat').hide();
    $('#btn-dang-ky').click(() => {
        const username = $('#txt-username').val();
        socket.emit('DANG_KY_USER', username);
    });
    socket.on('XAC_NHAN_DANG_KY', arrUser => {
        if (arrUser) {
            $('#div-chat').show();
            $('#div-dang-ky').hide();
            renderList(arrUser);
            socket.on('NGUOI_DUNG_MOI', user => {
                addUserToList(user);
            });
        }
    });
});
