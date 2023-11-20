import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: User['role']) {
    if (role) {
      const arrRoles = this.users.filter((user) => user.role === role);
      if (!arrRoles.length) {
        throw new NotFoundException('User Role Not Found');
      }
      return arrRoles;
    }
    return this.users;
  }

  findOne(id: User['id']) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const hightestId = Math.max(...this.users.map((user) => user.id));

    const newUser = {
      id: hightestId + 1 ?? 0,
      ...createUserDto,
    };

    this.users.push(newUser);
  }

  update(id: User['id'], updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: User['id']) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id === id);

    return removedUser;
  }
}
