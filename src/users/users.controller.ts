import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

export type User = {
  id: number;
  name: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll(@Query('role') role?: User['role']) {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() userUpdate: Partial<Omit<User, 'id'>>,
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
