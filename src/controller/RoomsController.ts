import { Server } from "socket.io";
import { Request, Response, Router } from "express";
import { Room } from "../entity/Room";
import { RoomRepositoryOnMemory } from "../repository/RoomRepository";
import { Controller } from './controller';

export class RoomsController implements Controller {
  private rooms: RoomRepositoryOnMemory;

  constructor(private router: Router, private server: Server) {
    router.get('/', this.listRooms.bind(this));
    router.get('/:room', this.goToRoom.bind(this));
    router.post('/', this.createRoom.bind(this));

    this.rooms = RoomRepositoryOnMemory.repository;
  }
  get ctx() {return this.router}

  private listRooms(request: Request, response: Response) {
    response.render('rooms', {
      rooms: this.rooms.all(),
      message: request.query.message
    });
  }

  private async createRoom(request: Request, response: Response) {
    const room = this.rooms.add(
      new Room(request.body)
    );
    this.server.sockets.emit('loadRooms', this.rooms.all());
    return response.status(201).redirect(`/rooms/${room.id}`);
  }

  private goToRoom(request: Request, response: Response) {
    const {room} = request.params;
    const roomLoaded = this.rooms.findOne(room);
    if(!(roomLoaded instanceof Room)) {
      return response.status(404)
        .redirect('/rooms?message=Room not found!');
    }
    return response.render('room',{
      room: roomLoaded,
      attendees: roomLoaded.allAttendees
    });
  }
}
