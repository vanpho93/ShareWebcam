const $ = require('jquery');

const renderListUser = (list) => {
    list.forEach(e => {
        if (e.username !== $('#p-my-name').text()) {
            const html = `<div id="${e.id}" class="li-user">${e.username}</div>`;
            $('#ul-user').append(html);
        }
    });
};

module.exports = renderListUser;
