import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
//these correspond to columns in db
//@Property = regular column
export class Post {
    @PrimaryKey()
    id!: number;

    @Property({type:'date'})
    createdAt = new Date();

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property({type: 'text'})
    title!: string;
}
