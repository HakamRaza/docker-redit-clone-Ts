import { MikroORM } from "@mikro-orm/core";
import mickroConfig from "./mikro-orm.config";

export default async () => {
    const orm = await MikroORM.init(mickroConfig);

    // run migration to create Post table
    await orm.getMigrator().up();

    // create fork to avoid global context, 
    // reference: https://stackoverflow.com/questions/71117269/validation-error-using-global-entity-manager-instance-methods-for-context-speci
    return orm.em.fork();
}