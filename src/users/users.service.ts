import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const save = await this.userRepository.insert(user);
    return save;
  }

  findAll() {
    const user = this.userRepository.find();
    return user;
  }

  findOne(id: number) {
    const userId = this.userRepository.findOneBy({id: id});
    return userId;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOneBy({id: id});
    user = {
      ...user,
      ...updateUserDto
    }
    const update = await this.userRepository.save(user);
    return update;
  }

  remove(id: number) {
    const user = this.userRepository.delete(id);
    return user;
  }
}
