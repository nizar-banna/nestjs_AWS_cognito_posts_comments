import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { DeleteResult, Repository } from 'typeorm';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/posts.dto';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postService.create(createPostDto);
  }
  @Get()
  findAll(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(id: string): Promise<Posts> {
    return this.postService.findOne(id);
  }

  @Get(':id')
  remove(id: string): Promise<DeleteResult> {
    return this.postService.remove(id);
  }
}
