import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { JwtService } from "@nestjs/jwt";
import { mockedJwtService } from "src/utils/mocks/jwt.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../users.model";

describe('UsersController', () => {

  let usersController: UsersController;
  const mockUserService = {
    createUser: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),
    updateUser: jest.fn(dto => {
      return dto;
      
    })
  };

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
      ]
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
      
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a user', () => {
    const dto = {
      email: 'user@main.ru', 
      password: 'user'
    }
    expect(usersController.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto
    });

  });

  it('should update a user', () => {
    const dto = {
      id: 1,
      password: 'user'
    }
    expect(usersController.update(dto)).toEqual(dto);

    //expect(mockUserService.updateUser(dto)).toHaveBeenCalledWith(dto);
  });


});