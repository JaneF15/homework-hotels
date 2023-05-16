import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from './../auth/auth.service';
import { Gender } from './../enums/gender';
import { UsersService } from './../users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profiles.model';

@Injectable()
export class ProfilesService {

  constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
              private authService: AuthService, 
              private jwtService: JwtService, 
              private userService: UsersService) {
  }

  async createProfile(profileDto: CreateProfileDto) {
    this.checkGender(profileDto.gender);
    
    const token = await this.authService.registration(profileDto);
    const user = this.jwtService.verify(token.token);

    const profile = await this.profileRepository.create({...profileDto, userId: user.id});
    return profile;
  }

  async getAllProfiles() {
    const profile = await this.profileRepository.findAll({include: {all: true}});
    return profile;
  }

  async deleteProfile(id: number) {
    const profile = await this.profileRepository.findOne({where: {id}});
    await this.userService.deleteUser(profile.userId);
  }

  async updateProfile(profileDto: UpdateProfileDto) {
    this.checkGender(profileDto.gender);
    await this.profileRepository.update(profileDto, {where: {id: profileDto.id}});
  }

  private checkGender(gender: string) {
    if (gender !== Gender.male && gender !== Gender.female) {
      throw new HttpException('Некорректное поле: пол', HttpStatus.BAD_REQUEST);
    }
    return gender;
  }

}
