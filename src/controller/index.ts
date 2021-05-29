import { Router } from "express";
import { Server } from "socket.io";
import { AttendeeController } from "./AttendeeController";
import { RoomsController } from "./RoomsController";

export const Routes = [
  {
    route: '/rooms',
    controller(socket: Server){
      return new RoomsController(Router(), socket);
    }
  },
  {
    route: '/attendees',
    controller(socket:Server) {
      return new AttendeeController(Router(), socket);
    }
  }
]
