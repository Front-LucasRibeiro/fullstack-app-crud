import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { createUserSchema } from './user.validation';

@Controller('/users')
export class UserController {

  constructor(private userRepository: UserRepository) { }

  @Post()
  async createUser(@Body() dataUsers: UserEntity) {

    const validationResult = await createUserSchema.validate(dataUsers);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }

    const newUser = await this.userRepository.save(dataUsers);
    return newUser;
  }

  @Get()
  async listUsers(): Promise<UserEntity[]> {
    return this.userRepository.list();
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UserEntity) {
    const userUpdated = await this.userRepository.update(id, newData);

    return {
      user: userUpdated,
      message: 'Usuário atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const userDeleted = await this.userRepository.remove(id)

    return {
      user: userDeleted,
      message: 'Usuário removido com sucesso'
    }
  }
}
