import {Arg, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver} from "type-graphql";
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

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    errorMsg: string
}

@ObjectType()
class LoginResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]
    @Field(() => User, {nullable: true})
    user?: User
}

@ObjectType()
class UsernameResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]
    @Field(() => User, {nullable: true})
    user?: User
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

    @Mutation( () => LoginResponse)
    async loginUser(
        @Arg('userCreds') userCreds: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<LoginResponse> {
        //get user
        const user = await em.findOne(User, {username: userCreds.username});
        //if user not found
        if (!user) {
            return {
                errors: [{
                    field: "username",
                    errorMsg: "Username not found",
                }]
            }
        }
        //check password
        const valid = await argon2.verify(user.password, userCreds.password)
        if (!valid) {
            return {
                errors: [{
                    field: "password",
                    errorMsg: "Incorrect password",
                }]
            }
        }
        return { user:user }
    }




    @Mutation( () => UsernameResponse)
    async createUser(
        @Arg('userCreds') userCreds: UsernamePasswordInput,
        @Ctx() { em }: MyContext): Promise<UsernameResponse> {

        //hash password; await because .hash() returns a promise
        const hashedPassword = await argon2.hash(userCreds.password)
        //create new username
        const newUser = em.create(User, {
            username: userCreds.username,
            password: hashedPassword
        })

        try {
            await em.persistAndFlush(newUser)
        } catch(err) {
           console.log('createUser error: ', err)
            if (err.code === "23505") {
                return {
                    errors: [{
                        field: "username",
                        errorMsg: "username already taken",
                    }]
                }
            }
        }
        return { user: newUser }
    }

    @Mutation( () => UsernameResponse, {nullable: true})
    async updateUsername(
        @Arg('id', () => Int) id: number,
        @Arg('username', () => String) username: string,
        @Ctx() { em }: MyContext): Promise<UsernameResponse> {
        const user = await em.findOne(User,{id} )
        if (!user){
            return {
                errors: [{
                    field: 'id',
                    errorMsg: 'Username not found'
                }]
            }
        }
        if (typeof username !== 'undefined') {
           user.username = username
            await em.persistAndFlush(user)
        }
        try {
            await em.persistAndFlush(user)
        } catch(err) {
            console.log('updateUsername error: ', err.message)
            if (err.code === "23505") {
                return {
                    errors: [{
                        field: "username",
                        errorMsg: "username already taken",
                    }]
                }
            }
        }
        return { user: user }
    }

    @Mutation( () => Boolean)
    async deleteUser(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext) {
        try {
            await em.nativeDelete(User, {id})
        } catch(err) {
            console.log("deleteUser error: ", err)
            return false
        }
        return true
    }


}
