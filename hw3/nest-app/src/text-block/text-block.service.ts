import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';
import { TextBlock } from './text-block.model';

@Injectable()
export class TextBlockService {

  constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
              private fileService: FilesService) {
  }

  async getAllTextBlocks() {
    const textBlocks = await this.textBlockRepository.findAll({include: {all: true}});
    return textBlocks;
  }

  async getTextBlockByGroup(group: string) {
    const textBlocks = await this.textBlockRepository.findAll({where: {group}});
    return textBlocks;
  }

  async createTextBlock(textBlockDto: CreateTextBlockDto, image: any) {
    const fileNames = await this.fileService.saveFile(image);
    const textBlock = await this.textBlockRepository.create(textBlockDto);
  
    const forFileSave = {
      ...fileNames,
      essenceTable: this.textBlockRepository.getTableName(), 
    }
    const file = await this.fileService.saveFileInDatabase(forFileSave);
    textBlock.$set('image', file.id);
    
    textBlock.image = file;
    return textBlock;
  }

  async updateTextBlock(textBlockDto: UpdateTextBlockDto, image: any) {

    await this.textBlockRepository.update(textBlockDto, {where: {id: textBlockDto.id}});
      
    if (!image) { return }

    const textBlock = await this.textBlockRepository.findByPk(textBlockDto.id);
    const file = (await textBlock.$get('image')).dataValues;

    const fileNames = await this.fileService.saveFile(image, file.fileName);

    await this.fileService.updateFile({...fileNames, id: file.id});
  }


  async deleteTextBlock(id: number) {
    const textBlock = await this.textBlockRepository.findByPk(id);
    const file = (await textBlock.$get('image')).dataValues;
    await this.fileService.updateFile({essenceTable: null, essenceId: null, id: file.id});
    await this.textBlockRepository.destroy({where: {id}});
  }

}
