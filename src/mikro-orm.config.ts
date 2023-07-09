import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), //create absolute path to the folder with migrations
        pattern: /^[w-]+\d+\.[tj]s$/,
    },
    entities:[Post],
    dbName:'reddit',
    user:"postgres",
    // port: 5432,
    // password:'',
    debug: !__prod__,
    type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0]
