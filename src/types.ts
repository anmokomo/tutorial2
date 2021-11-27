import {Connection, EntityManager, IDatabaseDriver} from "@mikro-orm/core";

//got type from looking at the type of 'orm.em'
export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>
}
