import { IsString, Length } from "class-validator";
import { Gender } from "src/enums/gender";

export class UpdateProfileDto {
  readonly id: number;

  @IsString({message: 'Должно быть строкой'})
  readonly firstName: string;
  
  @IsString({message: 'Должно быть строкой'})
  readonly lastName: string;

  readonly gender: Gender;

  @IsString({message: 'Должно быть строкой'})
  @Length(11, 12, {message: 'Длина должна быть не меньше 11 и не больше 12 символов'})
  readonly phoneNumber: string;
}