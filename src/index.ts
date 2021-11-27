import { MikroORM} from "@mikro-orm/core";
import {Post} from "./entities/Post";
import microConfig from "../mikro-orm.config"

const main = async () => {
    //added await because this returns a promise
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
}
console.log('hello world')

main().catch(err => console.log(err))

