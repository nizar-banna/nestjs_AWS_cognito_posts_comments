import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comments } from '../comments/comments.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // cognitoId: string;

  @Column()
  userName: string;

  @Column()
  userConfirmed: boolean;

  @Column({ name: 'created_at', default: () => `now()`, nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => `now()`, nullable: false })
  updatedAt: Date;
}
