const openCamera = require('./util/openCamera');
const createPeer = require('./util/createInitPeer');
const playFriendVideo = require('./util/playFriendVideo');

const call = (socket, idReceiver) => {
    openCamera()
    .then(stream => {
        const peer = createPeer(stream);
        peer.on('signal', signal => {
            console.log('idReceiver === ', idReceiver);
            socket.emit('CALL_OTHER', { idReceiver, signal });
        });

        socket.on('ACCEPT_SIGNAL', signal => peer.signal(signal));

        peer.on('stream', friendStream => {
            console.log('GOT AN STREAM HERE');
            playFriendVideo(friendStream);
        });
    });
};

module.exports = call;

// socket.emit('CALL_OTHER', idReceiver);
