import { __prod__ } from "./constant";
// import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import mickroConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer as Apollo} from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";


const main = async () => { 
    const PORT  = process.env.PORT || 4000;

    const orm = await MikroORM.init(mickroConfig);

    // run migration to create Post table
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new Apollo({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // app.get('/', (_, res) => {
    //     res.send('Hello express');
    // });

    // can open https://studio.apollographql.com/sandbox/explorer to start query

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });




    /**
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
     */
}


main().catch((err: Error) => {
    console.error(err);
});