import { isNil, isString } from "lodash";
import { v4 } from "uuid";
import { Either } from "../utils/Either";
import { InvalidParam } from "./errors/InvalidParam";

export class Attendee {
  public readonly id: string;
  public readonly name: string;

  private constructor(data: Partial<Attendee>) {
    this.id = data.id || v4();
    this.name = data.name;
  }

  public static create(data: Partial<Attendee>): Either<any, Attendee> {
    if (isNil(data.name) || !isString(data.name) || data.name.trim() === '') {
      return Either.left(new InvalidParam('Invalid name'));
    }
    return Either.right(new Attendee(data));
  }

  toJSON() {
    const attendee = this;
    delete attendee['token'];
    return attendee;
  }
}
