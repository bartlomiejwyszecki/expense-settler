import { IUser, User } from '@expense-settler-monorepo/shared-lib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): IUser[] {
    return [];
  }
}
