import { model, Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";
import { VisitorResponse } from "./visitor";

// interface
export interface RoomTypes {
  link: string;
  id: string;
  owner: string;
}

// Schema
const RoomSchema = new Schema<RoomTypes>({
  link: String,
  id: { type: String, unique: true },
  owner: String
});

// Model
const Room = model<RoomTypes>("Room", RoomSchema);

// Export
export default Room;

// ObjectType
@ObjectType()
export class RoomResponse {
  @Field(() => String)
  link: string;

  @Field(() => String)
  id: string;

  @Field(() => [VisitorResponse])
  visitors?: VisitorResponse[];
}
