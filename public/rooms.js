const socket = io('/');

const roomsElement = document.getElementById('rooms');

socket.on('loadRooms', (rooms) => {
  const allRooms = rooms.map(room => `
    <a href="/rooms/${room.id}">
      ${room.subject}
    </a><br />
  `).join('');
  roomsElement.innerHTML = allRooms;
});
