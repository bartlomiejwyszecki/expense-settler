import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repository.create({ email, password });

    return this.repository.save(user);
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  find(email: string) {
    return this.repository.find({ where: { email } });
  }

  update() {}

  remove() {}
}
