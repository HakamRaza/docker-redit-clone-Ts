import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import mickroConfig from "./mikro-orm.config";


const main = async () => {
    const orm = await MikroORM.init(mickroConfig);

    // run migration to create Post table
    await orm.getMigrator().up();

    // create fork to avoid global context, 
    // reference: https://stackoverflow.com/questions/71117269/validation-error-using-global-entity-manager-instance-methods-for-context-speci
    const em = orm.em.fork();

    // creating constructor object
    const post = em.create(Post, {title: 'My first post'});

    // exercute query
    await em.persistAndFlush(post);

    console.log('---------------------sql 2 ---------------------');

    // above equivalent to:
    // await em.nativeInsert(Post, {title: 'my first post 2'});

    // but to run this, need to create table. (or run migration first)
    const posts = await em.find(Post, {});

    console.log(posts);
}


main().catch((err: Error) => {
    console.error(err);
});