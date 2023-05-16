import { INestApplication } from "@nestjs/common";
import { RolesService } from "../roles.service";
import { Test } from "@nestjs/testing";
import * as request from 'supertest';
import { RolesController } from "../roles.controller";
import { CreateRoleDto } from "../dto/create-role.dto";

const createRoleDto: CreateRoleDto = {
  value: 'ADMIN',
  description: "Администратор",
};

describe('RolesController', () => {

  let rolesController: RolesController;

  let app: INestApplication;

  beforeEach(async () => {

    const module = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: {
            createRole: jest.fn().mockImplementation((role: CreateRoleDto) =>
                Promise.resolve({ id: '1', ...role })
              ),
            getRoleByValue: jest.fn().mockImplementation((value: string) =>
              Promise.resolve({
                id: '1',
                value,
                description: "Администратор",
              })
            ),
          },
        },
      ]

    })
      .compile();

      rolesController = module.get<RolesController>(RolesController);

      app = module.createNestApplication();
      await app.init();
      
  });

  it('should be defined', () => {
    expect(rolesController).toBeDefined();
  });

  it(`/GET roles`, () => {
    return request(app.getHttpServer())
      .get('/roles/ADMIN')
      .expect(200)
      .expect({
        id: '1',
        value: 'ADMIN',
        description: "Администратор",
      });
  });

  it('/POST roles', () => {
    return request(app.getHttpServer())
      .post('/roles')
      .send({
        value: createRoleDto.value,
        description: createRoleDto.description,
      })
      .expect(201)
      .expect({id: '1', ...createRoleDto});
  })

  afterAll(async () => {
    await app.close();
  });
});