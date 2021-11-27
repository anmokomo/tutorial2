//this class is both a type definition and an entity
import {Field, Int, ObjectType} from "type-graphql";
import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@ObjectType()
@Entity()
//these correspond to columns in db
//! = non-nullable
//@Property = regular column
export class User {
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
    @Property({type: 'text', unique: true})
    username!: string;

   //no @Field annotation
    @Property({type: 'text'})
    password!: string;
}
