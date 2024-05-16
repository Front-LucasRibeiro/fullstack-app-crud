import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UserValidation } from './validation/user.validation';

import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ListUserDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {

  constructor(
    private userService: UserService,
    private userValidation: UserValidation
  ) { }

  @Post()
  async createUser(@Body() dataUsers: CreateUserDTO) {
    try {
      const value = await this.userValidation.createUserSchema.validateAsync(dataUsers);
      const userCreated = await this.userService.createUserService(value);

      return {
        usuario: new ListUserDTO(value.id, value.nome, value.email),
        messagem: 'usuário criado com sucesso',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listUsers() {
    const usersSaved = await this.userService.listUsersService();
    return usersSaved;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    try {
      const value = await this.userValidation.updateUserSchema.validateAsync(newData);
      const userUpdated = await this.userService.updateUserService(id, value);
  
      return {
        user: userUpdated,
        message: 'Usuário atualizado com sucesso'
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const userDeleted = await this.userService.deleteUserService(id)

    return {
      user: userDeleted,
      message: 'Usuário removido com sucesso'
    }
  }
}
