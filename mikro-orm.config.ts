import {_prod_} from "./src/constants";
import { Post } from "./src/entities/Post";
import { MikroORM } from "@mikro-orm/core"
import path from "node:path";
import {User} from "./src/entities/User";


export default {
    entities: [Post, User],
    migrations: {
        migrations: {
            //creates an absolute path, so ok when run i diff directories
            path: path.join(__dirname, "./migrations"), // path to the folder with migrations
            pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
        },
    },
    dbName: 'lireddit',
    type: 'postgresql',
    // user: '',
    // password: '',
    debug: !_prod_
} as Parameters<typeof MikroORM.init>[0]
//need to cast to correct type
//Paramaters = gets paramaters of the type passed into
//<typeof.... casts into the typeof what the init function is expection
//So, we're getting the first paramater type of the init function
