import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],

  //подмножество providers этого модуля, которое должно быть доступно в других модулях, импортирующих этот модуль
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
