import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/sequelize';
import { Profile } from './../src/profiles/profiles.model';
import { ProfilesModule } from './../src/profiles/profiles.module';
import { User } from './../src/users/users.model';
import { UsersService } from './../src/users/users.service';
import { UsersModule } from './../src/users/users.module';
import { AuthModule } from './../src/auth/auth.module';

describe('ProfileController (e2e)', () => {
  let app: INestApplication;

  const mockUsersRepository = {

    create: jest.fn((dto) => {
      const user = {
        id: Date.now(), 
        ...dto, 
        $set(){}
      }
      return Promise.resolve(user);
    })

  };

  const mockProfiles = [
    {
      id: 1,
      name: 'Jane',
      userId: Date.now()
    },
    {
      id: 2,
      name: 'Ivan',
      userId: Date.now()
    },
    {
      id: 3,
      name: 'Kira',
      userId: Date.now()
    }
  ]

  const mockProfilesRepository = {

    findAll: jest.fn().mockResolvedValue(mockProfiles)

  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProfilesModule, UsersModule, AuthModule],

      // providers: [
      //   UsersService,
      //   {
      //     provide: getModelToken(User),
      //     useValue: mockUsersRepository
      //   },
      // ]
    })
    .overrideProvider(getModelToken(Profile))
    .useValue(mockProfilesRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/profiles (GET)', () => {
    return request(app.getHttpServer())
      .get('/profiles')
      .expect(200)
      .expect(mockProfiles);
  });
});
