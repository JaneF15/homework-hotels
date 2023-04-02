import { IsEmail, IsString, Length } from "class-validator";
import { Gender } from "src/enums/gender";

export class CreateProfileDto {
  @IsString({message: 'Должно быть строкой'})
  readonly firstName: string;

  @IsString({message: 'Должно быть строкой'})
  readonly lastName: string;

  readonly gender: Gender;

  @IsString({message: 'Должно быть строкой'})
  @Length(11, 12, {message: 'Длина должна быть не меньше 11 и не больше 12 символов'})
  readonly phoneNumber: string;

  @IsString({message: 'Должно быть строкой'})
  @IsEmail({}, {message: 'Некорректный email'})
  readonly email: string;

  @IsString({message: 'Должно быть строкой'})
  @Length(4, 16, {message: 'Длина должна быть не меньше 4 и не больше 16 символов'})
  readonly password: string;
}