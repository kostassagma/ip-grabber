import Invitation, { InvitationResponse } from "../models/inviteCode";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { nanoid } from "nanoid";

@Resolver()
export class InvitationsResolver {
  // is code valid
  @Mutation(() => Boolean!)
  async validCode(@Arg("inviteCode") code: string) {
    const invitation = await Invitation.findOne({ code });
    if (!invitation) {
      throw new Error("Invalid Code");
    }
    return true;
  }

  // create invite
  @Mutation(() => String!)
  async createInvite() {
    const code = await insertInvite();
    return code;
  }

  // delete invite
  @Mutation(() => Boolean!)
  async deleteInvite(@Arg("inviteCode") code: string) {
    await Invitation.deleteOne({ code });
    return true;
  }

  // clear invites
  @Mutation(() => Boolean!)
  async clearInvites() {
    await Invitation.deleteMany();
    return true;
  }

  // query all invites
  @Query(() => [InvitationResponse])
  async allInvitations() {
    const invitations = await Invitation.find({});
    return invitations;
  }
}

async function insertInvite(): Promise<string> {
  let code = nanoid().substring(0, 6);

  try {
    const invitation = new Invitation({ code: code });
    await invitation.save();
  } catch (err) {
    return insertInvite();
  }

  return code;
}
