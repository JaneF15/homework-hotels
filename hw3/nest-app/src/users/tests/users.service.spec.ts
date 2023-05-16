import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../users.model";
import { RolesService } from "src/roles/roles.service";
import { Role } from "src/roles/roles.model";


describe('UsersService', () => {

  let usersService: UsersService;
  
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
  const mockRolesRepository = {
    findOne: jest.fn(filter => {
      return {
        id: Date.now(),
        value: filter.where.value
      }
      
    })
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersRepository
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesRepository
        }
      ]
    })
      .compile();

    usersService = module.get<UsersService>(UsersService);
      
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    const dto = {
      email: 'user@main.ru', 
      password: 'user'
    }

    const received = await usersService.createUser(dto);
    const expected = {
      id: expect.any(Number),
      ...dto,
      roles: [{id: expect.any(Number), value: 'USER'}],
      //$set(){},
    }

    for (let key in expected) {
      expect(expected[key]).toEqual(received[key]);
    }

  });

});

