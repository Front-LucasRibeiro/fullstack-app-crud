import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListUserDTO } from "./dto/ListUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }
  
  async createUserService(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async listUsersService() {
    const usersSaved = await this.userRepository.find();
    const userList = usersSaved.map(
      (user) => new ListUserDTO(user.id, user.name)
    )

    return userList;
  }

  async updateUserService(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUserService(id: string) {
    await this.userRepository.delete(id);
  }
}