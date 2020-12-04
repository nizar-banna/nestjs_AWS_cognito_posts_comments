import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comments } from '../comments/comments.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ name: 'created_at', default: () => `now()`, nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => `now()`, nullable: false })
  updatedAt: Date;

  @OneToMany((type) => Comments, (comment) => comment.postId)
  comments: Comments[];
}
