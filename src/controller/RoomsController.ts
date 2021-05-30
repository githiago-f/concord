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
  get ctx() { return this.router }

  private listRooms(request: Request, response: Response) {
    response.render('rooms', {
      rooms: this.rooms.all(),
      message: request.query.message
    });
  }

  private async createRoom(request: Request, response: Response) {
    Room.create(request.body)
      .right((room) => {
        this.rooms.add(room);
        this.server.sockets.emit('loadRooms', this.rooms.all());
        return response.status(201).redirect(`/rooms/${room.id}`);
      })
      .left((e) => response.status(e.code).json(e));
  }

  private goToRoom(request: Request, response: Response) {
    const { room } = request.params;
    this.rooms.findOne(room)
      .right(room => {
        return response.render('room', {
          room,
          attendees: room.allAttendees
        })
      }).left(e => response.status(e.code).redirect('/rooms?message=' + e.message));
  }
}
