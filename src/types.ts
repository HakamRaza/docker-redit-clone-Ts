import {EntityManager, IDatabaseDriver, Connection} from '@mikro-orm/core'


export type MyContextType = {
    em: EntityManager<IDatabaseDriver<Connection>>
}