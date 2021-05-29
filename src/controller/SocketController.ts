import { Socket } from "socket.io";
import { Attendee } from "../entity/Attendee";
import { Room } from "../entity/Room";
import { AttendeeRepository } from "../repository/AttendeeRepository";
import { RoomRepositoryOnMemory } from "../repository/RoomRepository";

export class SocketController {
  private rooms: RoomRepositoryOnMemory;
  private attendees: AttendeeRepository;

  constructor(private socket: Socket) {
    socket.on('joinRoom', this.joinRoom.bind(this));
    socket.on('leftRoom', this.leftRoom.bind(this));

    this.rooms = RoomRepositoryOnMemory.repository;
    this.attendees = AttendeeRepository.repository;
  }

  joinRoom(roomId: string, userId: string) {
    const room = this.rooms.findOne(roomId);
    if(!(room instanceof Room)) {
      this.socket.emit('noRoom', 'Room not found!');
      return;
    }
    this.socket.join(roomId);
    const attendee = new Attendee({ name: userId });// this.attendees.findOne(userId);
    room.addAttendee(attendee);
    this.socket.to(roomId).emit('joinedRoom', room.allAttendees);
  }

  leftRoom(roomId: string, userId: string) {
    const room = this.rooms.findOne(roomId);
    if(!(room instanceof Room)) {
      this.socket.emit('noRoom', 'Room not found!');
      return;
    }
    const attendee = this.attendees.findOne(userId);
    this.socket.leave(roomId);
    room.removeAttendee(attendee);
    this.socket.to(roomId).emit('leftedRoom', room.allAttendees);
  }

  sendMessage() {}
}
