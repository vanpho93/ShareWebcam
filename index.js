const express = require('express');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

server.listen(process.env.PORT || 3000, () => console.log('Server started'));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));

class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
}

const arrUser = [];

io.on('connection', socket => {
    socket.on('DANG_KY_USER', username => {
        if (arrUser.every(e => e.username !== username)) {
            const user = new User(socket.id, username);
            arrUser.push(user);
            socket.broadcast.emit('NGUOI_DUNG_MOI', user);
            socket.emit('XAC_NHAN_DANG_KY', arrUser);
        } else {
            socket.emit('XAC_NHAN_DANG_KY', false);
        }
    });

    socket.on('disconnect', () => {
        const index = arrUser.findIndex(e => e.id === socket.id);
        arrUser.splice(index, 1);
        io.emit('NGUOI_DUNG_DISCONNECT', socket.id);
    });

    socket.on('CALL_OTHER', (data) => {
        const { idReceiver, signal } = data;
        const username = arrUser.find(e => e.id === socket.id).username;
        socket.broadcast.to(idReceiver)
        .emit('SOMEONE_CALL', { senderSignal: signal, senderId: socket.id, username });
    });

    socket.on('ACCEPT_CALL', data => {
        const { receiverId, signal } = data;
        socket.broadcast.to(receiverId).emit('ACCEPT_SIGNAL', signal);
    });
});
