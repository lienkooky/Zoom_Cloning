const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Conneted to Server ✅');
});
socket.addEventListener('message', (message) => {
  console.log('just got this: ', message.data);
});
socket.addEventListener('close', () => {
  console.log('Connected from Server🦊');
});

setTimeout(() => {
  socket.send('hello from the browser!');
}, 10000);
