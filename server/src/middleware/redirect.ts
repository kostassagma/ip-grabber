import { NextFunction, Request, Response } from "express";
import Visitor from "../models/visitor";
import Room from "../models/room";

export default async function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const roomId = req.query.room;
  if (!roomId) {
    return res.redirect("/notfound");
  }
  const room = await Room.findOne({ id: roomId.toString() });
  if (!room) {
    return res.redirect("/notfound?reason=RoomDoesNotExist");
  }
  const ip = req.ip;
  const visitor = new Visitor({ ip, room: roomId });
  await visitor.save()
  return res.redirect(room.link);
}
