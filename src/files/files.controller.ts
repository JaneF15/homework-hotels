import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  
  constructor(private fileService: FilesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file) {
    const fileNames = await this.fileService.saveFile(file);
    return this.fileService.saveFileInDatabase(fileNames);
  }

  @Get()
  getAll() {
    return this.fileService.getAllFiles();
  }

  @Delete()
  deleteFiles(){
    return this.fileService.deleteExtraFiles();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.fileService.deleteFile(id);
  }
  
}