import { Attendee } from "../entity/Attendee";

export class AttendeeRepository {
  public static readonly repository = new AttendeeRepository();

  private attendees: Map<string, Attendee>;
  private constructor() {
    this.attendees = new Map();
  }

  findOne(id: string): Attendee|null {
    return this.attendees.get(id);
  }

  create(attendee: Attendee) {
    this.attendees.set(attendee.id, attendee);
    return attendee;
  }

  remove(attendeeId: string) {
    this.attendees.delete(attendeeId);
  }
}
