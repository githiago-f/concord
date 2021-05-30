import { isNil } from "lodash";
import { v4 } from "uuid";
import { Either } from "../utils/Either";
import { Attendee } from "./Attendee";
import { InvalidParam } from "./errors/InvalidParam";

export class Room {
  public readonly id: string;
  public readonly attendees: Set<Attendee>;
  public readonly subject: string;

  private constructor(room?: Partial<Room>) {
    this.id = room?.id || v4();
    this.subject = room.subject;
    this.attendees = new Set();
  }

  static create(room: Partial<Room>): Either<InvalidParam, Room> {
    if (isNil(room.subject) || room.subject.trim() === '') {
      return Either.left(new InvalidParam('Invalid subject'));
    }
    return Either.right(new Room(room));
  }

  addAttendee(attendee: Attendee) {
    if (this.attendees.has(attendee)) {
      return { message: `${attendee.name} is already at this room.` }
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
