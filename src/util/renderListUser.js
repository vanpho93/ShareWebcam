const $ = require('jquery');

const renderListUser = (list) => {
    list.forEach(e => {
        if (e.username !== $('#p-my-name').text()) {
            const html = `<li id="${e.id}"><p class="li-user">${e.username}</p></li>`;
            $('#ul-user').append(html);
        }
    });
};

module.exports = renderListUser;
