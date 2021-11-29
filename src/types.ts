import {Connection, EntityManager, IDatabaseDriver} from "@mikro-orm/core";
import {Request, Response } from "express";
import {Session, SessionData} from "express-session";

//got type from looking at the type of 'orm.em'
export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    req: Request & { session: Session & Partial<SessionData>}
    res: Response
}
