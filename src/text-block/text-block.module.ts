import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { TextBlockController } from './text-block.controller';
import { TextBlock } from './text-block.model';
import { TextBlockService } from './text-block.service';

@Module({
  controllers: [TextBlockController],
  providers: [TextBlockService],
  imports: [
    SequelizeModule.forFeature([TextBlock]),
    FilesModule,
    AuthModule
  ]
})
export class TextBlockModule {}
