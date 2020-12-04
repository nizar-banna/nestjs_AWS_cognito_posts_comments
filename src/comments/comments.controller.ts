import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comments.dto';
import { Comments } from './comments.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post(':postId')
  create(
    @Param('postId') id: string,
    @Body()
    createCommentDto: CreateCommentDto,
  ): Promise<Comments> {
    return this.commentService.create(createCommentDto, id);
  }
  @Get()
  findAll(): Promise<Comments[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(id: string): Promise<Comments> {
    return this.commentService.findOne(id);
  }

  @Get(':id')
  remove(id: string): Promise<DeleteResult> {
    return this.commentService.remove(id);
  }
}
