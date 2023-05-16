import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OwnGuard } from './../auth/own-auth.guard';
import { Roles } from './../auth/roles-auth.decorator';
import { RolesGuard } from './../auth/roles-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@UsePipes(ValidationPipe)
@Controller()
export class ProfilesController {

  constructor(private profileService: ProfilesService) {}

  @Get('/profiles')
  getAll() {
    return this.profileService.getAllProfiles();
  }

  @Post('/registration')
  registration(@Body() profileDto: CreateProfileDto) {
    return this.profileService.createProfile(profileDto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(OwnGuard)
  @Put('/profiles')
  update(@Body() profileDto: UpdateProfileDto) {
    return this.profileService.updateProfile(profileDto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(OwnGuard)
  @Delete('/profiles/:id')
  delete(@Param('id') id: number) {
    return this.profileService.deleteProfile(id);
  }
  
}
