import { Invalid } from "../../utils/Either";

export class InvalidParam implements Invalid {
  public readonly code = 422;
  public readonly message: string;
  constructor(message: string) {
    this.message = message;
  }
}