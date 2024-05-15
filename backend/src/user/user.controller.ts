import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { createUserSchema, updateUserSchema } from './validation/user.validation';
import { v4 as uuid } from 'uuid';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ListUserDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {

  constructor(
    private userRepository: UserRepository,
    private userService: UserService
  ) { }

  @Post()
  async createUser(@Body() dataUsers: CreateUserDTO) {
    try {
      const value = await createUserSchema.validateAsync(dataUsers);

      const userEntity = new UserEntity();
      userEntity.email = value.email;
      userEntity.password = value.password;
      userEntity.name = value.name;
      userEntity.id = uuid();

      this.userService.createUserService(userEntity);
      
      return {
        user: new ListUserDTO(userEntity.id, userEntity.name),
        message: "Usuário criado com sucesso."
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  async listUsers() {
    const usersSaved = await this.userService.listUsersService();
    return usersSaved;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    try {
      const value = await updateUserSchema.validateAsync(newData);
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
