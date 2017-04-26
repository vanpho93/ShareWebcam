const $ = require('jquery');

const renderListUser = (user) => {
    $('#ul-user').append(`<li id="${user.id}">${user.username}</li>`);
};

module.exports = renderListUser;
