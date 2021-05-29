import { Request, Response, Router } from "express";
import { Server } from "socket.io";
import { Attendee } from "../entity/Attendee";
import { AttendeeRepository } from "../repository/AttendeeRepository";
import { Controller } from "./controller";

export class AttendeeController implements Controller {
  private attendees: AttendeeRepository;

  constructor(private router: Router, private server: Server) {
    router.post('/', this.createAttendee.bind(this));

    this.attendees = AttendeeRepository.repository;
  }
  public get ctx(): Router {
    return this.router;
  }

  private createAttendee(request: Request, response: Response) {
    const attendee = new Attendee(request.body);
    this.attendees.create(attendee);
    return response.status(201).json({
      message: 'Created successfuly!',
      attendee
    });
  }
}
