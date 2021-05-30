import { Attendee } from "../entity/Attendee";
import { Either } from "../utils/Either";
import { NotFound } from "./errors/NotFound";

export class AttendeeRepository {
  public static readonly repository = new AttendeeRepository();

  private attendees: Map<string, Attendee>;
  private constructor() {
    this.attendees = new Map();
  }

  findOne(id: string): Either<NotFound, Attendee> {
    if(!this.attendees.has(id)) {
      return Either.left(new NotFound('Attendee not found!'));
    }
    return Either.right(this.attendees.get(id));
  }

  create(attendee: Attendee) {
    this.attendees.set(attendee.id, attendee);
    return attendee;
  }

  remove(attendeeId: string) {
    this.attendees.delete(attendeeId);
  }
}
