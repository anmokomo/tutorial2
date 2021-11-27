import {_prod_} from "../constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core"


export default {
    entities: [Post],
    dbName: 'lireddit',
    type: 'postgresql',
    // user: '',
    // password: '',
    debug: !_prod_,
} as Parameters<typeof MikroORM.init>[0]
//need to cast to correct type
//Paramaters = gets paramaters of the type passed into
//<typeof.... casts into the typeof what the init function is expection
//So, we're getting the first paramater type of the init function
