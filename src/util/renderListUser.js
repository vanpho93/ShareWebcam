const $ = require('jquery');

const renderListUser = (list) => {
    list.forEach(e => $('#ul-user').append(`<li id="${e.id}">${e.username}</li>`));
};

module.exports = renderListUser;
