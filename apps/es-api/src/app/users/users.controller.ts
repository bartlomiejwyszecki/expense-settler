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
  Session,
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

  @Get('/me')
  async getMe(@Session() session: any) {
    const user = await this._usersService.findOne(session.userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any
  ) {
    const user = await this._authService.signup(
      createUserDto.email,
      createUserDto.password
    );

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this._authService.signin(
      createUserDto.email,
      createUserDto.password
    );

    session.userId = user.id;

    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
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
