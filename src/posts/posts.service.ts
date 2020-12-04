import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePostDto } from './dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private PostRepository: Repository<Posts>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Posts> {
    const post = new Posts();
    post.title = createPostDto.title;
    post.desc = createPostDto.desc;
    return this.PostRepository.save(post);
  }

  async findAll(): Promise<Posts[]> {
    return this.PostRepository.find({ relations: ['comments'] });
  }
  async findOne(id: string): Promise<Posts> {
    return this.PostRepository.findOne(id, { relations: ['comments'] });
  }
  async remove(id: string): Promise<DeleteResult> {
    return this.PostRepository.delete(id);
  }
}
