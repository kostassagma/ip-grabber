import Invitation from "../models/inviteCode";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { passwordStrength } from "check-password-strength";
import { compare, hash } from "bcryptjs";
import User from "../models/user";
import { createAccessToken } from "../lib/auth";

@Resolver()
export class AuthResolver {
  // create account
  @Mutation(() => Boolean!)
  async createAccount(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("invitation") invitationCode: string
  ) {
    const invitation = await Invitation.findOne({ code: invitationCode });
    if (!invitation) {
      throw new Error("Invalid Invite");
    }
    if (passwordStrength(password).id !== 3) {
      throw new Error("Too Weak Password");
    }
    const hashedPassword = await hash(password, 12);
    const user = new User({ username, password: hashedPassword });
    try {
      await user.save();
    } catch (err) {
      throw new Error("Username taken");
    }
    return true;
  }

  // login
  @Mutation(() => LoginResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    const user = await User.findOne({ username });
    // checking if user exists
    if (!user) throw new Error("User Not Found");
    // checking password validity
    const correctPassword = await compare(password, user.password);
    if (!correctPassword) throw new Error("Incorrect Password");

    return { accessToken: await createAccessToken(user._id) };
  }
}

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string;
}
