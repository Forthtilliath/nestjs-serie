import { Injectable } from '@nestjs/common';
import { User } from './users.controller';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: User['id']) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  create(user: Omit<User, 'id'>) {
    const hightestId = Math.max(...this.users.map((user) => user.id));

    const newUser = {
      id: hightestId + 1 ?? 0,
      ...user,
    };

    this.users.push(newUser);
  }

  update(id: User['id'], updatedUser: Partial<Omit<User, 'id'>>) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
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
