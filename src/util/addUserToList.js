const $ = require('jquery');

const renderListUser = (user) => {
    $('#ul-user').append(`<li id="${user.id}"><p class="li-user">${user.username}</p></li>`);
};

module.exports = renderListUser;
