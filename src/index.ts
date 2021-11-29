import { MikroORM} from "@mikro-orm/core";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {ApolloServer} from "apollo-server-express";
import connectRedis from 'connect-redis';
import express from 'express'
import session from 'express-session';
import redis from 'redis';
import {buildSchema} from 'type-graphql'
import microConfig from "../mikro-orm.config"
import {HelloResolver} from "./resolvers/hello.resolver";
import {PostResolver} from "./resolvers/post.resolver";
import {UserResolver} from "./resolvers/user.resolver";
//import {_prod_} from "./constants";
import {MyContext} from "./types";

declare module "express-session" {
    interface Session {
        userId: number
    }
}

const main = async () => {
    //connect to db using config file
    const orm = await MikroORM.init(microConfig)
    //run migrations
    await orm.getMigrator().up()

    //create a Post object
    //const post = orm.em.create(Post, {title: 'my first post'})
    //update db
    //await orm.em.persistAndFlush(post)
    //get posts
    // const posts = await orm.em.find(Post,{})
    // console.log(posts)

    const app = express()
    //create express get endpoint; _ = param when not used
    // app.get('/', (_, res) => {
    //     res.send('hello')
    // })

    //connect to redis
    const RedisStore = connectRedis(session)
    let redisClient
    try {
        redisClient = await redis.createClient()
    } catch(err) {console.log('createClient',err)}
    //Redis needs to be set up before Apollo, because Redis will be used in the middleware
    app.use(
        session({
            cookie: {
                httpOnly: true, //in JS code, can't access cookie
                maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
                sameSite: 'lax', // csrf
                //TODO change to false if having problems in prod
                //secure: _prod_ //cookie only works in https
            },
            name: 'qid',
            resave: false,
            saveUninitialized: false, //set whether or not to create empty sessions
            //TODO use env var
            secret: 'fdskfjdsklfjkl',
            store: new RedisStore({
                client: redisClient,
                disableTouch: true
            })
        })
    )
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        //instead of web console, can use local console @ 4000
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground(),],
        //context func; accessible to resolvers; access to req and res from express sessions
        context: ({ req, res }): MyContext => ({ em: orm.em, req, res })
    })

    //go to <server>/graphql to see graphql console
    await apolloServer.start()
    //create a graphql endpoint on express
    apolloServer.applyMiddleware({ app, cors: {
            credentials: true,
        } })

    app.listen(4000,() => {
        console.log('server started on port 4000')
    })
}
console.log('hello world')

main().catch(err => console.log(err))

