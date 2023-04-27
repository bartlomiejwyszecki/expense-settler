import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'password',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: 'password' },
        ] as User[]);
      },
    };
    fakeAuthService = {
      signup: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should findAllUsers and return a list of users', async () => {
    const users = await controller.getUsers('test@test.com');

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('should findUser and return the user with given id', async () => {
    const user = await controller.getUser('1');

    expect(user).toBeDefined();
  });

  it('should findUser and throw an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;

    await expect(controller.getUser('1')).rejects.toThrow(NotFoundException);
  });

  it('should signin, update session object and return the user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      {
        email: 'test@test.com',
        password: 'password',
      },
      session
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

  it('should signup, update session object and return the user', async () => {
    const session = { userId: -10 };
    const user = await controller.createUser(
      {
        email: 'test@test.com',
        password: 'password',
      },
      session
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
