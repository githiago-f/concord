import { v4 } from "uuid";

export class Attendee {
  public readonly id: string;
  public readonly name: string;
  constructor(data: Partial<Attendee>) {
    this.id = data.id || v4();
    this.name = data.name;
  }
}
