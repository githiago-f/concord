import { Router } from "express";
import { Server } from "socket.io";
import { RoomsController } from "./RoomsController";

export const Routes = [
  {
    route: '/rooms',
    controller(socket: Server){
      return new RoomsController(Router(), socket);
    }
  }
]
