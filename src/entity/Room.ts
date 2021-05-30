import { isNil, isString } from "lodash";
import { v4 } from "uuid";
import { Either } from "../utils/Either";
import { Attendee } from "./Attendee";
import { InvalidParam } from "./errors/InvalidParam";

export class Room {
  public readonly id: string;
  public readonly attendees: Map<string, Attendee>;
  public readonly subject: string;

  private constructor(room?: Partial<Room>) {
    this.id = room?.id || v4();
    this.subject = room.subject;
    this.attendees = new Map();
  }

  static create(room: Partial<Room>): Either<InvalidParam, Room> {
    if (isNil(room.subject) || !isString(room.subject) || room.subject.trim() === '') {
      return Either.left(new InvalidParam('Invalid subject'));
    }
    return Either.right(new Room(room));
  }

  addAttendee(attendee: Attendee): Either<any, Attendee> {
    if (this.attendees.has(attendee.id)) {
      return Either.left({
        code: 409,
        message: 'Already exists'
      });
    }
    this.attendees.set(attendee.id, attendee);
    return Either.right(attendee);
  }

  removeAttendee(attendeeId: string) {
    if(this.attendees.has(attendeeId)) {
      this.attendees.delete(attendeeId);
    }
  }

  public get allAttendees() {
    return Array.from(this.attendees.values());
  }
}
