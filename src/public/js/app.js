const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

socket.addEventListener('open', () => {
  console.log('Conneted to Server ✅');
});
socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});
socket.addEventListener('close', () => {
  console.log('Connected from Server🦊');
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  console.log(input.value);
  input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);
