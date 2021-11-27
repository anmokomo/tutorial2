import {Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver} from "type-graphql";
import {User} from "../entities/User";
import {MyContext} from "../types";
import argon2 from 'argon2'

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users(@Ctx() { em }: MyContext): Promise<User[]> {
        return em.find(User, {})
    }

    @Query(() => User, {nullable: true})
    userById(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext): Promise<User | null> {
        return em.findOne(User, {id})
    }

    @Query(() => User, {nullable: true})
    userByUsername(
        @Arg('username', () => String) username: string,
        @Ctx() { em }: MyContext): Promise<User | null> {
        return em.findOne(User, {username})
    }

    @Mutation( () => User)
    async createUser(
        @Arg('userCreds') userCreds: UsernamePasswordInput,
        @Ctx() { em }: MyContext): Promise<User> {

        //hash password; await because .hash() returns a promise
        const hashedPassword = await argon2.hash(userCreds.password)
        //create new username
        const newUser = em.create(User, {
            username: userCreds.username,
            password: hashedPassword
        })
        await em.persistAndFlush(newUser)
        return newUser
    }

    @Mutation( () => User, {nullable: true})
    async updateUsername(
        @Arg('id', () => Int) id: number,
        @Arg('username', () => String) username: string,
        @Ctx() { em }: MyContext): Promise<User | null> {
        const user = await em.findOne(User,{id} )
        if (!user){
            return null
        }
        if (typeof username !== 'undefined') {
           user.username = username
            await em.persistAndFlush(user)
        }
        return user
    }

    @Mutation( () => Boolean)
    async deleteUser(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext) {
        await em.nativeDelete(User, {id})
        return true
    }
}
