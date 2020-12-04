import { Injectable } from '@nestjs/common';
import { Comments } from './comments.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}
  create(
    createCommentDto: CreateCommentDto,
    postId: string,
  ): Promise<Comments> {
    const comment = new Comments();
    comment.desc = createCommentDto.desc;
    comment.postId = postId;
    return this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comments[]> {
    return this.commentsRepository.find();
  }
  async findOne(id: string): Promise<Comments> {
    return this.commentsRepository.findOne(id);
  }
  async remove(id: string): Promise<DeleteResult> {
    return this.commentsRepository.delete(id);
  }
}
