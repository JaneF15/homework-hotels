import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { Files } from './files.model';
import { CreateFileDto } from './dto/create-file.dto';
import { Sequelize } from 'sequelize';
import { UpdateFileDto } from './dto/update-file.dto';


@Injectable()
export class FilesService {

  constructor(@InjectModel(Files) private fileRepository: typeof Files) {
  }

  async saveFile(file, name = null) {
    try {
      
      //генерируем уникальное имя для файла
      const fileName = name || this.generateUniqueFileName(file);
      const filePath = process.env.UPLOADS_PATH;
      
      //если по пути filePath ничего нет, то создаем папки по этому пути
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      //записываем file в файл со сгенерированным названием
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      
      return {
        fileName,
        originalName: file.originalname
      }
    } catch (e) {
        throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async saveFileInDatabase(fileDto: CreateFileDto) {
    return await this.fileRepository.create(fileDto);
  }

  async getAllFiles() {
    const files = await this.fileRepository.findAll();
    return files;
  }

  async updateFile(fileDto: UpdateFileDto) {
    await this.fileRepository.update(fileDto, {where: {id: fileDto.id}});
  }

  async deleteExtraFiles() {
    const files = await this.fileRepository.findAll({where: Sequelize.or({essenceTable: null}, {essenceId: null})});

    const now = Date.now();

    for (const file of files) {
      if (now - file.createdAt > 3600000) {
        await this.fileRepository.destroy({where: {id: file.id}});
        const filePath = process.env.UPLOADS_PATH;
    
        fs.rmSync(path.join(filePath, file.fileName));
      }
    }
  
  }

  async deleteFile(id: number) {
    const filePath = process.env.UNLOADS_PATH;
    
    const file = await this.fileRepository.findByPk(id);
    fs.rmSync(path.join(filePath, file.fileName));

    await this.fileRepository.destroy({where: {id}});
  }


  private generateUniqueFileName(file) {
    const fileName = uuid.v4();
    const fileExtName = path.extname(file.originalname);
    
    return `${fileName}${fileExtName}`;
  }

}
