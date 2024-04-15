import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: "50" })
  @Field()
  country_code!: string;

  @Column({ type: "varchar", length: "255" })
  @Field()
  name!: string;

  @Column({ type: "varchar", length: "255" })
  @Field()
  emoji!: string;

  @Column({ type: "varchar", length: "50" })
  @Field()
  continent_code!: string;
}

@InputType()
export class CountryCreateInput {
  @Field()
  country_code!: string;
  @Field()
  name!: string;
  @Field()
  emoji!: string;
  @Field()
  continent_code!: string;
}
