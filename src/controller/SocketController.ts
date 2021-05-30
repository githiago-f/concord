import { Socket } from "socket.io";
import { Attendee } from "../entity/Attendee";
import { AttendeeRepository } from "../repository/AttendeeRepository";
import { NotFound } from "../repository/errors/NotFound";
import { RoomRepositoryOnMemory } from "../repository/RoomRepository";

export class SocketController {
  private rooms: RoomRepositoryOnMemory;
  private attendees: AttendeeRepository;

  constructor(private socket: Socket) {
    socket.on('joinRoom', this.joinRoom.bind(this));
    socket.on('disconnect', this.disconnect.bind(this));
    socket.on('sendMessage', this.sendMessage.bind(this));

    this.rooms = RoomRepositoryOnMemory.repository;
    this.attendees = AttendeeRepository.repository;
  }

  private noRoom(e: NotFound) {
    this.socket.emit('noRoom', e.message);
  }

  private joinRoom(roomId: string, data: Partial<Attendee>) {
    this.rooms.findOne(roomId)
      .right(room => {
        this.socket.join(room.id);
        Attendee.create({...data, id: this.socket.id })
          .right(attendee => {
            this.attendees.create(attendee);
            room.addAttendee(attendee);
            this.socket.to(roomId).emit('joinedRoom', room.allAttendees);
          });
      })
      .left(this.noRoom.bind(this));
  }

  private disconnect() {
    this.rooms.all().forEach((room) => {
      if(room.attendees.has(this.socket.id)) {
        room.removeAttendee(this.socket.id);
        this.socket.to(room.id).emit('leftedRoom', room.allAttendees);
      }
    });
  }

  private sendMessage(roomId: string, message: { text: string, user: Attendee }) {
    this.socket.to(roomId).emit('newMessage', message);
  }
}
