import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ length: '255' })
  @Field(() => String)
  email: string;

  @Column({ length: '50' })
  @Field(() => String)
  name: string;

  @Column({ length: '255', nullable: true })
  @Field(() => String, { nullable: true })
  address: string;
}

export default User;
