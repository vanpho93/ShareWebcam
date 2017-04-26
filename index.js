const express = require('express');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

server.listen(3000, () => console.log('Server started'));

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
});
