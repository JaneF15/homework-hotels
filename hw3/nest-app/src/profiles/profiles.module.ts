import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './../auth/auth.module';
import { User } from './../users/users.model';
import { UsersModule } from './../users/users.module';
import { ProfilesController } from './profiles.controller';
import { Profile } from './profiles.model';
import { ProfilesService } from './profiles.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    AuthModule,
    UsersModule,
    JwtModule
  ],
  //exports: [SequelizeModule]
})
export class ProfilesModule {}
