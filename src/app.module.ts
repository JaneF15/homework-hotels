import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from "./profiles/profiles.model";
import { TextBlockModule } from './text-block/text-block.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { Files } from "./files/files.model";
import { FilesModule } from './files/files.module';
import { MulterModule } from "@nestjs/platform-express";
import { TextBlock } from "./text-block/text-block.model";

@Module({
  controllers: [],
  providers: [],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    //для раздачи статики
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.env.UNLOADS_PATH),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Profile, Files, TextBlock],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProfilesModule,
    TextBlockModule,
    FilesModule,
  ]
})
export class AppModule {};