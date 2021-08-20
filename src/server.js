import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

wss.on('connection', (socket) => {
  sockets.push(socket);
  console.log('Conneted to Browser ✅');
  socket.on('close', () => {
    console.log('Disconneted from th Browser 🦊');
  });
  socket.on('message', (message) => {
    sockets.forEach((aSocket) => {
      aSocket.send(message);
    });
  });
});

const handelListen = () => console.log(`Listening on http://localhost:3000`);
server.listen(3000, handelListen);
