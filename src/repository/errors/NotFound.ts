import { Invalid } from "../../utils/Either";

export class NotFound implements Invalid {
  public readonly code = 404;
  public readonly message: string;
  constructor(message: string) {
    this.message = message;
  }
}