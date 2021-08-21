# Zoom_Cloning

🍒21.08.02 월\_Cloning_Zoom with Node, WebRTC and Websockets.

</br>
</br>

##

### 21.08.20

<br/>

> what happen this err?

- Uncaught TypeError: Cannot read property 'addEventListener' of null
  at app.js:36

> how to work?

- i used pug and i didn't write class, like this (#message, #nick)

### 21.08.21

<br/>

> what happen this err?

- crbug/1173575, non-JS module files deprecated.

> how to work?

- stackoverflow said, change my url 3000 -> 8000, but didn't working😢
- found err, becuze i didn't write "})"
- or, didn't save

> what happen this err?

- Uncaught TypeError: Cannot set property 'hidden' of null
  at app.js:7

> how to work?

- change id tag at home.pug

> what happen this err?

- when i enter the room, can see "someone joined" and "someone leaved"

> how to work?

- change app.js code like this
- 첫 번째 매개변수가 나올 때 동시에 실행되는 것이 아닌 나온 후에 실행 시키는 것에 차이가 있다.

```js
//before
socket.on('welcome', addMessage('someone joined'));
socket.on('bye', addMessage('someone leaved'));
socket.on('new_message', addMessage());

//after
socket.on('welcome', () => {
  addMessage('someone joined');
});
socket.on('bye', () => {
  addMessage('someone leaved');
});
socket.on('new_message', addMessage);
```
