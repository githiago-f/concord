import { Room } from "../entity/Room";

export class RoomRepositoryOnMemory {
  public static readonly repository = new RoomRepositoryOnMemory();
  private rooms: Map<string, Room>;
  private constructor() {
    this.rooms = new Map();
  }

  add(room: Room) {
    if(this.rooms.has(room.id)) {
      return this.rooms.get(room.id);
    }
    this.rooms.set(room.id, room);
    return this.rooms.get(room.id);
  }

  findOne(roomId: string) {
    if(this.rooms.has(roomId)) {
      return this.rooms.get(roomId);
    }
    return { message: 'Not found!' };
  }

  all() { return Array.from(this.rooms.values()); }

  has(roomId: string) { return this.rooms.has(roomId); }
}
