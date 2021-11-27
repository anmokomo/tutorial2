import { MikroORM} from "@mikro-orm/core";
import {Post} from "./entities/Post";
import microConfig from "./mikro-orm.config"

const main = async () => {
    //added await because this returns a promise
    //orm configs
    const orm = await MikroORM.init(microConfig)

    //create a Post object
    const post = orm.em.create(Post, {title: 'my first post'})
    //update db
    await orm.em.persistAndFlush(post)
}



main()

console.log('hello world')
