import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserValidation } from './validation/user.validation';
import { ConfigService } from '@nestjs/config';

import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ListUserDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import * as bcrypt from 'bcryptjs';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@Controller('/users')
export class UserController {
  
  constructor(
    private userService: UserService,
    private userValidation: UserValidation,
    private configService: ConfigService,
  ) { }

  @Post()
  async createUser(@Body() dataUsers: CreateUserDTO) {
    try {
      const value = await this.userValidation.createUserSchema.validateAsync(dataUsers);
      const sal = this.configService.get<string>('SAL_PASSWORD')
      const hashedPassword = await bcrypt.hash(value.password, sal); 
      await this.userService.createUserService({ ...value, password: hashedPassword});
      
      return {
        usuario: new ListUserDTO(value.id, value.name, value.email),
        messagem: 'usuário criado com sucesso', 
      }; 
    } catch (error) {
      throw new Error(error.message); 
    }
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10 * 1000) //10 seg
  async listUsers() {
    const usersSaved = await this.userService.listUsersService();
    return usersSaved;
  }

  @Put('/:id')
  @UseGuards(AuthenticationGuard)    
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    try {
      const value = await this.userValidation.updateUserSchema.validateAsync(newData);
      const userUpdated = await this.userService.updateUserService(id, value);
  
      return {
        user: id,
        message: 'Usuário atualizado com sucesso'
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthenticationGuard)
  async deleteUser(@Param('id') id: string) {
    const userDeleted = await this.userService.deleteUserService(id)

    return {
      user: userDeleted,
      message: 'Usuário removido com sucesso'
    }
  }
}
