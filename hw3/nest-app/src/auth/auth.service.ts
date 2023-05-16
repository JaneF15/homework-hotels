import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
        throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({...userDto, password: hashPassword});
    return this.generateToken(user);
}

  async login(userDto: CreateUserDto) {
    const user =  await this.validateUser(userDto);
    return this.generateToken(user);
  }

  //генерирует access token
  private generateToken(user: User) {
    const payload = {id: user.id, email: user.email, roles: user.roles};

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({message: 'Пользователь с таким email не существует'})
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException({message: 'Некорректный пароль'})
    }
    return user;
  }

}
