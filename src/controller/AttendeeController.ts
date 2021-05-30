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
    Attendee.create(request.body)
      .right((attendee) => {
        this.attendees.create(attendee);
        response.json(attendee);
      })
      .left((e) => response.status(422).json(e));
  }
}
