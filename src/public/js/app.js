const socket = io();

const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');
const camerasSelect = document.getElementById('cameras');

let myStream;
let muted = false;
let cameraOff = false;

async function getCamears() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    const currentCamera = myStream.getVideoTracks()[0];
    // console.log(cameras);
    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (err) {
    console.log(err);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: 'user' },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCamears();
    }
  } catch (err) {
    console.log(err);
  }
}
getMedia();

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = 'Unmute';
    muted = true;
  } else {
    muteBtn.innerText = 'Mute';
    muted = false;
  }
}
function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = 'Turn Camera Off';
    cameraOff = false;
  } else {
    cameraBtn.innerText = 'Turn Camara On';
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect);
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
camerasSelect.addEventListener('input', handleCameraChange);

/* ---------- socket.io를 이용해 메세지 보내는 방법 -------------------- */

/*
const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;
let roomName = '';

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.textContent = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  const value = input.value;
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You: ${value}`);
    input.value = '';
  });
}

function handleNickNameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#name input');
  socket.emit('nickname', input.vlaue);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.textContent = `Room ${roomName}`;
  const msgForm = room.querySelector('#msg');
  const nameForm = room.querySelector('#name');
  msgForm.addEventListener('submit', handleMessageSubmit);
  nameForm.addEventListener('submit', handleNickNameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.textContent = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined`);
});
socket.on('bye', (left, newCount) => {
  const h3 = room.querySelector('h3');
  h3.textContent = `Room ${newCount} (${newCount})`;
  addMessage(`${left} leaved`);
});
socket.on('new_message', addMessage);
socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.textContent = room;
    roomList.appendChild(li);
  });
});
*/

/* ------------ 일반 메세지 보내는 방법 ------------------------------------ */

/*
const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener('open', () => {
  console.log('Conneted to Server ✅');
});
socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.textContent = message.data;
  messageList.append(li);
});
socket.addEventListener('close', () => {
  console.log('Connected from Server🦊');
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  const li = document.createElement('li');
  li.textContent = `U : ${input.value}`;
  messageList.append(li);
  input.value = '';
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
*/
