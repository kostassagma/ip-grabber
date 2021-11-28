import { MyContext } from "../lib/myContext";
import { authOnly } from "../middleware/authOnly";
import { Query, Resolver, UseMiddleware, Ctx } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String!)
  hello() {
    return "hello";
  }

  @Query(() => String!)
  @UseMiddleware(authOnly)
  helloUser(@Ctx() { payload }: MyContext) {
    return payload!.userId;
  }
}
