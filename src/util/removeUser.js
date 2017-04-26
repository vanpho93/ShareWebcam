const $ = require('jquery');

const removeUser = id => $(`#${id}`).remove();
module.exports = removeUser;
