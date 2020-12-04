import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../posts/post.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  desc: string;

  @Column({ name: 'created_at', default: () => `now()`, nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => `now()`, nullable: false })
  updatedAt: Date;

  @ManyToOne((type) => Posts, (post) => post.comments)
  postId: string;
}
