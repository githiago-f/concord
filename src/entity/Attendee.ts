import { isNil } from "lodash";
import { Either } from "../utils/Either";
import { InvalidParam } from "./errors/InvalidParam";

export class Attendee {
  public readonly id: string;
  public readonly name: string;
  constructor(data: Partial<Attendee>) {
    this.id = data.id;
    this.name = data.name;
  }

  public static create(data: Partial<Attendee>): Either<any, Attendee> {
    if (isNil(data.name) || data.name.trim() === '') {
      return Either.left(new InvalidParam('Invalid name'));
    }
    if (isNil(data.id)) {
      return Either.left(new InvalidParam('Invalid id'));
    }
    return Either.right(new Attendee(data));
  }
}
