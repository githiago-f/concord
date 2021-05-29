const socket = io('/');

const USER_ID = Math.random().toString(16);

socket.emit('joinRoom', ROOM_ID, USER_ID);

const renderAttendees = () => {
  const toRender = Array.from(room.attendees.values()).map(i => `
    <p>${i.name}</p>
  `).join('');
  document.getElementById('attendees').innerHTML = toRender;
};

socket.on('joinedRoom', (attendees) => {
  room.attendees = new Set(attendees);
  renderAttendees();
});

socket.on('leftedRoom', () => {
  // todo
});

renderAttendees();

window.onclose = (e) => {
  e.preventDefault();
  socket.emit('leftRoom', ROOM_ID, USER_ID);
}
window.onreset = (e) => {
  e.preventDefault();
  socket.emit('leftRoom', ROOM_ID, USER_ID);
}
