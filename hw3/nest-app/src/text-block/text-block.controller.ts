import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-auth.guard';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';
import { TextBlock } from './text-block.model';
import { TextBlockService } from './text-block.service';

@Controller('text-block')
export class TextBlockController {

  constructor(private textBlockService: TextBlockService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  //Перехватчик FileInterceptor() обработчика маршрута извлекает файл из запроса с помощью @UploadedFile()
  //в FileInterceptor() передаем название поля формы, которое содержит файл
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() textBlockDto: CreateTextBlockDto, @UploadedFile() image): Promise<TextBlock> {
    return this.textBlockService.createTextBlock(textBlockDto, image)
  }

  @Get()
  getAll() {
    return this.textBlockService.getAllTextBlocks();
  }

  @Get('/:group')
  getByGroup(@Param('group') group: string) {
    return this.textBlockService.getTextBlockByGroup(group);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put()
  @UseInterceptors(FileInterceptor('image'))
  update(@Body() textBlockDto: UpdateTextBlockDto, @UploadedFile() image): Promise<void> {
    return this.textBlockService.updateTextBlock(textBlockDto, image);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.textBlockService.deleteTextBlock(id);
  }

}
