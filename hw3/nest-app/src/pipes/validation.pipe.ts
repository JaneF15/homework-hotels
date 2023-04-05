import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform {

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    console.log("metadata.metatype: ", metadata.metatype);
    console.log("value: ", value);
    
    const obj = plainToClass(metadata.metatype, value);
    console.log("obj: ", obj);
    
    const errors = await validate(obj);

    if (errors.length) {
      let messages = errors.map(err => {
        //err.property -- название св-ва, которое не прошло валидацию
        //в err.constraints хранятся сообщения об ошибках
        return `${err.property} - ${Object.values(err.constraints).join('; ')}`
      })
      throw new ValidationException(messages);
    }

    return value;
  }

}