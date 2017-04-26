const $ = require('jquery');

const renderListUser = (list) => {
    list.forEach(e => $('#ul-user').append(`<li id="${e.id}"><p class="li-user">${e.username}</p></li>`));
};

module.exports = renderListUser;
