const $ = require('jquery');

const renderList = require('./util/renderListUser');
const addUserToList = require('./util/addUserToList');
const removeUserFromList = require('./util/removeUser');

const listHandler = socket => {
    const f = arrUser => {
        if (arrUser) {
            $('#div-chat').show();
            $('#div-dang-ky').hide();
            renderList(arrUser);
            socket.on('NGUOI_DUNG_MOI', user => {
                addUserToList(user);
            });
            socket.on('NGUOI_DUNG_DISCONNECT', socketId => {
                removeUserFromList(socketId);
            });
        } else {
            alert('Username đã có người sử dụng, vui lòng chọn username khác');
        }
    };
    return f;
};

module.exports = listHandler;
