import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`${id} not found`);
    return user;
  }

  remove(id: number): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`${id} not found`);
    this.users.splice(index, 1);
  }
}