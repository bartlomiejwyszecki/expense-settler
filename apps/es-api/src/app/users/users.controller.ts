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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private _usersService: UsersService,
    private _authService: AuthService
  ) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this._authService.signup(
      createUserDto.email,
      createUserDto.password
    );
  }

  @Post('/signin')
  signin(@Body() createUserDto: CreateUserDto) {
    return this._authService.signin(
      createUserDto.email,
      createUserDto.password
    );
  }

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
