import { model, Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

// interface
interface InvitationTypes {
  code: string;
  used: boolean;
}

// Schema
const InvitationSchema = new Schema<InvitationTypes>({
  code: { type: String, unique: true },
  used: { type: Boolean, default: false },
});

// Model
const Invitation = model<InvitationTypes>("Invitation", InvitationSchema);

// Export
export default Invitation;

// ObjectType
@ObjectType()
export class InvitationResponse {
  @Field(() => String)
  code: string;

  @Field(() => Boolean)
  used: boolean;
}
