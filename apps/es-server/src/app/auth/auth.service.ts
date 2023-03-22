import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUserCredentials(
    username: string,
    password: string
  ): Promise<any> {
    const user = await this.usersService.getUser({ username, password });

    if (user) {
      return user;
    }

    return null;
  }

  async loginWithCredentials(user: any) {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
