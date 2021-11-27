import { MikroORM} from "@mikro-orm/core";
import {Post} from "./entities/Post";
import microConfig from "../mikro-orm.config"
import express from 'express'
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from 'type-graphql'
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";

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
    const posts = await orm.em.find(Post,{})
    console.log(posts)


    const app = express()
    //create express get endpoint; _ = param when not used
    // app.get('/', (_, res) => {
    //     res.send('hello')
    // })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        //accessible to resolvers
        context: () => ({ em: orm.em })
    })

    //go to <server>/graphql to see graphql console
    await apolloServer.start()
    //create a graphql endpoint on express
    apolloServer.applyMiddleware({ app })

    app.listen(4000,() => {
        console.log('server started on port 4000')
    })

}
console.log('hello world')

main().catch(err => console.log(err))

