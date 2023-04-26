import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const matchingUsers = users.filter((user) => user.email === email);

        return Promise.resolve(matchingUsers);
      },
      create: (email: string, password: string) => {
        const newUser = { id: Math.random() * 999, email, password } as User;

        users.push(newUser);

        return Promise.resolve(newUser);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'password');

    expect(user.password).not.toEqual('password');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('test@test.com', 'password');

    await expect(service.signup('test@test.com', 'password2')).rejects.toThrow(
      BadRequestException
    );
  });

  it('throws an error if signin is called with an unused email', async () => {
    await expect(
      service.signin('unused@mail.com', 'testpassword')
    ).rejects.toThrow(NotFoundException);
  });

  it('throws bad request exception if an invalid password is provided', async () => {
    await service.signup('test2@test.com', 'validpassword');

    await expect(
      service.signin('test2@test.com', 'invalidpassword')
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('test3@test.com', 'validpassword');

    const user = await service.signin('test3@test.com', 'validpassword');

    expect(user).toBeDefined();
  });
});
