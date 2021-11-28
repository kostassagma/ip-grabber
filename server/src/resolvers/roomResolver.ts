import Room, { RoomResponse } from "../models/room";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../lib/myContext";
import { authOnly } from "../middleware/authOnly";
import { nanoid } from "nanoid";
import Visitor from "../models/visitor";

@Resolver()
export class RoomResolver {
  @Query(() => [RoomResponse])
  @UseMiddleware(authOnly)
  async myRooms(@Ctx() { payload }: MyContext) {
    return await Room.find({ owner: payload!.userId! });
  }

  @Query(() => RoomResponse)
  @UseMiddleware(authOnly)
  async roomDetails(@Arg("id") id: string, @Ctx() { payload }: MyContext) {
    // find room
    const room = await Room.findOne({ id });
    if (!room) {
      throw new Error("Room not found");
    }
    // query room visitors
    const visitors = await Visitor.find({ room: id });
    // return room with visitors added
    let roomJsonDoc: any = room.toJSON();
    return { ...roomJsonDoc, visitors };
  }

  @Mutation(() => RoomResponse)
  @UseMiddleware(authOnly)
  async createRoom(@Arg("link") link: string, @Ctx() { payload }: MyContext) {
    const id = await getUniqueRoomId();
    const room = new Room({ id, link, owner: payload!.userId! });
    await room.save();
    return room;
  }
}

async function getUniqueRoomId(): Promise<string> {
  let id = nanoid(10);
  const exists = await Room.findOne({ id });
  if (!exists) {
    return id;
  }
  return await getUniqueRoomId();
}
