import { Entity, PrimaryKey, Property, OptionalProps } from "@mikro-orm/core";

@Entity()
export class Post {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  _id!: Number;

  @Property({type: "date"})
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({type: "text"})
  title!: string;
}