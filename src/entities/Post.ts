import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {Field, Int, ObjectType} from "type-graphql";

//this class is both a type definition and an entity
@ObjectType()
@Entity()
//these correspond to columns in db
//@Property = regular column
export class Post {
    //without @Field, unable to query this property in graphql (isn't added to schema)
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({type:'date'})
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property({type: 'text'})
    title!: string;
}
