import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListUserDTO } from "./dto/ListUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { CreateUserDTO } from "./dto/CreateUser.dto";

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }
  
  async createUserService(dataUser: CreateUserDTO) {
    const userEntity = new UserEntity();

    userEntity.email = dataUser.email;
    userEntity.password = dataUser.password;
    userEntity.name = dataUser.name;

    return this.userRepository.save(userEntity);
  }

  async listUsersService() {
    const usersSaved = await this.userRepository.find();
    const userList = usersSaved.map(
      (user) => new ListUserDTO(user.id, user.name, user.email)
    )

    return userList; 
  }

  async searchByEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async updateUserService(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUserService(id: string) {
    await this.userRepository.delete(id);
  }
}