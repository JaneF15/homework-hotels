import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],

  //подмножество providers этого модуля, которое должно быть доступно в других модулях, импортирующих этот модуль
  exports: [
    RolesService
  ]
})
export class RolesModule {}
