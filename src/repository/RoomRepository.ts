import { Room } from "../entity/Room";
import { Either } from "../utils/Either";
import { NotFound } from "./errors/NotFound";

export class RoomRepositoryOnMemory {
  public static readonly repository = new RoomRepositoryOnMemory();
  private rooms: Map<string, Room>;
  private constructor() {
    this.rooms = new Map();
  }

  add(room: Room) {
    if (this.rooms.has(room.id)) {
      return this.rooms.get(room.id);
    }
    this.rooms.set(room.id, room);
    return this.rooms.get(room.id);
  }

  findOne(roomId: string): Either<NotFound, Room> {
    if (!this.has(roomId)) {
      return Either.left(new NotFound('Room not found'));
    }
    return Either.right(this.rooms.get(roomId));
  }

  all() { return Array.from(this.rooms.values()); }

  has(roomId: string) { return this.rooms.has(roomId); }
}
