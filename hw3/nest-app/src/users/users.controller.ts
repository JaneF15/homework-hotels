import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OwnGuard } from './../auth/own-auth.guard';
import { Roles } from './../auth/roles-auth.decorator';
import { RolesGuard } from './../auth/roles-auth.guard';
import { AddRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Roles("ADMIN")
@UseGuards(RolesGuard)
@UsePipes(ValidationPipe)
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @UseGuards(OwnGuard)
  @Put()
  update(@Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(userDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

}
