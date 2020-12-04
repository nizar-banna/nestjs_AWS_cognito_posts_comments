import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto & Users> {
    return this.userRepo.save(createUserDto);
  }
}
