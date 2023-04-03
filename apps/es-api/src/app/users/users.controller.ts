import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    this._usersService.create(createUserDto.email, createUserDto.password);
  }

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this._usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get()
  getUsers(@Query('email') email: string) {
    return this._usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this._usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this._usersService.update(parseInt(id), updateUserDto);
  }
}
