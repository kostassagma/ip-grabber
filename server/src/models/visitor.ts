import { model, Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

// interface
interface VisitorTypes {
  room: string;
  ip: string;
  time: Date;
}

// Schema
const VisitorSchema = new Schema<VisitorTypes>({
  ip: String,
  time: { type: Date, default: () => new Date() },
});

// Model
const Visitor = model<VisitorTypes>("Visitor", VisitorSchema);

// Export
export default Visitor;

// ObjectType
@ObjectType()
export class VisitorResponse {
  @Field(() => String)
  ip: string;

  @Field(() => Boolean)
  time: boolean;
}
