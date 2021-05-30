const socket = io('/');

const randomUser = Math.random().toString(32).split('.')[1];
const user = {
  name: prompt('Whats your name?', randomUser)
};

socket.emit('joinRoom', window.ROOM_ID, user);

const renderAttendees = () => {
  const toRender = Array.from(room.attendees.values()).map(i => `
    <div><span>${i.name}</span></div>
  `).join('');
  document.getElementById('attendees').innerHTML = toRender;
};

const renderMessages = () => {
  const messages = room.messages.map(i => `
    <p><b>(${i.user.name}):</b>&nbsp; ${i.text}</p>
  `).join('');
  console.log(messages);
  document.getElementById('messages').innerHTML = messages;
}

document.getElementById('sendMessage').onclick = e => {
  const input = document.getElementById('message');
  const text = input.value;
  if (text.trim() === '') {
    return;
  }
  room.messages.push({ text, user });
  renderMessages();
  socket.emit('sendMessage', room.id, {
    text,
    user
  });
  input.value = '';
}

socket.on('joinedRoom', (attendees) => {
  room.attendees = new Set(attendees);
  renderAttendees();
});

socket.on('leftedRoom', (attendees) => {
  room.attendees = new Set(attendees);
  renderAttendees();
});

socket.on('newMessage', (message) => {
  room.messages.push(message);
  renderMessages();
});

room.attendees.add(user);
renderAttendees();
