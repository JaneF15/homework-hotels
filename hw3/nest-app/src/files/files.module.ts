import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlock } from 'src/text-block/text-block.model';
import { FilesController } from './files.controller';
import { Files } from './files.model';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService], 
  exports: [FilesService],
  imports: [
    SequelizeModule.forFeature([Files, TextBlock]),
  ]
  
})
export class FilesModule {}
