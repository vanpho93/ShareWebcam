const $ = require('jquery');

const renderListUser = (user) => {
    $('#ul-user').append(`<div id="${user.id}" class="li-user">${user.username}</div>`);
};

module.exports = renderListUser;
