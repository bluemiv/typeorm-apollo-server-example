import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import User from '../entities/user';

@Resolver()
class UserResolver {
  @Query((returns) => User)
  async user(@Arg('id') id: string) {
    return await User.findOneBy({ id });
  }

  @Query((returns) => [User])
  async users() {
    return await User.find();
  }

  @Mutation((returns) => User)
  async createUser(
    @Arg('email') email: string,
    @Arg('name') name: string,
    @Arg('address', { nullable: true }) address?: string
  ) {
    const createdUser = await User.create({
      email,
      name,
      address,
    });
    await createdUser.save();
    return createdUser;
  }
}

export default UserResolver;
