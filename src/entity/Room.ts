import { v4 } from "uuid";
import { Attendee } from "./Attendee";

export class Room {
  public readonly id: string;
  public readonly attendees: Set<Attendee>;
  public readonly subject: string;

  constructor(room?: Partial<Room>) {
    this.id = room?.id || v4();
    this.subject = room.subject;
    this.attendees = new Set();
  }

  addAttendee(attendee: Attendee) {
    if(this.attendees.has(attendee)) {
      return { message: `${attendee.name} is already at this room.`}
    }
    this.attendees.add(attendee);
  }

  removeAttendee(attendee: Attendee) {
    this.attendees.delete(attendee);
  }

  public get allAttendees() {
    return Array.from(this.attendees.values());
  }
}
