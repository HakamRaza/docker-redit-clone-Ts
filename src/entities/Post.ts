import { Entity, PrimaryKey, Property, OptionalProps } from "@mikro-orm/core";
import {ObjectType, Field, Int} from 'type-graphql'

@ObjectType()
@Entity()
export class Post {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Field(() => Int)
  @PrimaryKey()
  _id!: Number;

  // @Field(()=> String) /** comment out will remove createdAt from being expose to graphql */
  @Property({type: "date"})
  createdAt: Date = new Date();

  @Field(()=> String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({type: "text"})
  title!: string;
}