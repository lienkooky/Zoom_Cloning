const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', { payload: input.value });
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);

/* ----------------------------------------------------- */

// const messageList = document.querySelector('ul');
// const nickForm = document.querySelector('#nick');
// const messageForm = document.querySelector('#message');
// const socket = new WebSocket(`ws://${window.location.host}`);

// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }

// socket.addEventListener('open', () => {
//   console.log('Conneted to Server ✅');
// });
// socket.addEventListener('message', (message) => {
//   const li = document.createElement('li');
//   li.textContent = message.data;
//   messageList.append(li);
// });
// socket.addEventListener('close', () => {
//   console.log('Connected from Server🦊');
// });

// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector('input');
//   socket.send(makeMessage('new_message', input.value));
//   const li = document.createElement('li');
//   li.textContent = `U : ${input.value}`;
//   messageList.append(li);
//   input.value = '';
// }

// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector('input');
//   socket.send(makeMessage('nickname', input.value));
// }

// messageForm.addEventListener('submit', handleSubmit);
// nickForm.addEventListener('submit', handleNickSubmit);
