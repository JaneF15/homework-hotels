import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from './../profiles/profiles.model';
import { Role } from './../roles/roles.model';
import { RolesModule } from './../roles/roles.module';
import { UserRoles } from './../roles/user-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
    RolesModule,
    //forwardRef(() => AuthModule)
  ],

  //подмножество providers этого модуля, которое должно быть доступно в других модулях, импортирующих этот модуль
  exports: [UsersService]
})
export class UsersModule {}
