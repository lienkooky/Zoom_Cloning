import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

/* ---------- socket.io를 이용해 메세지 보내는 방법 -------------------- */

/*
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on('connection', (socket) => {
  socket['nickname'] = 'anon';
  socket.onAny((event) => {
    console.log(`${event}`);
  });
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit('welcome', socket.nickname, countRoom(roomName));
    wsServer.sockets.emit('room_change', publicRooms());
  });
  socket.on('disconneting', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit('bye', socket.nickname, countRoom(room) - 1)
    );
  });
  socket.on('disconnect', () => {
    wsServer.sockets.emit('room_change', publicRooms());
  });
  socket.on('new_message', (msg, room, done) => {
    socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
});

const handelListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handelListen);

*/

/* ------------ 일반 메세지 보내는 방법 ------------------------------------ */

/* 
wsServer.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'Anon';
  console.log('Conneted to Browser ✅');
  socket.on('close', () => {
    console.log('Disconneted from th Browser 🦊');
  });
  socket.on('message', (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case 'new_message':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case 'nickname':
        socket['nickname'] = message.payload;
    }
  });
})
*/
