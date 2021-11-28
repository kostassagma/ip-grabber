import { model, Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

// interface
interface UserTypes {
  username: string;
  password: string;
  used: boolean;
}

// Schema
const UserSchema = new Schema<UserTypes>({
  username: { type: String, unique: true },
  password: String,
  used: { type: Boolean, default: false },
});

// Model
const User = model<UserTypes>("User", UserSchema);

// Export
export default User;

// ObjectType
@ObjectType()
export class UserResponse {
  @Field(() => String)
  username: string;

  @Field(() => Boolean)
  used: boolean;

  @Field(() => String)
  _id: string;
}
