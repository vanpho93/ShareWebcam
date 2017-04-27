const $ = require('jquery');
const openCamera = require('./util/openCamera');
const createReceivePeer = require('./util/createReceivePeer');
const playFriendVideo = require('./util/playFriendVideo');

const onReceiveSignal = (socket, data) => {
    const { senderSignal, senderId, username } = data;
    $('#tr-video').append(`
        <td border="1" width="50%">
            <div class="div-my-name">${username}</div>
            <video style="width:345px; height:300px; margin:0; padding:0"></video>
        </td>
    `);
    openCamera()
        .then(stream => {
            const peer = createReceivePeer(stream);
            peer.signal(senderSignal);
            peer.on('signal', signal => {
                socket.emit('ACCEPT_CALL', { receiverId: senderId, signal });
            });
            peer.on('stream', friendStream => {
                console.log('GOT AN STREAM HERE');
                playFriendVideo(friendStream);
            });
        });
};

module.exports = onReceiveSignal;

// socket.emit('CALL_OTHER', idReceiver);
