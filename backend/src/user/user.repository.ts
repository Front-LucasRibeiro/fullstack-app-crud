import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private searchById(id: string) {
    const userExists = this.users.find(
      userSaved => userSaved.id === id
    );

    if (!userExists) {
      throw new Error('Usuário não encontrado')
    }

    return userExists;
  }

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list(): Promise<UserEntity[]> {
    return this.users;
  }

  async update(id: string, newData: Partial<UserEntity>) {
    const user = this.searchById(id)
    

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') {
        return; 
      }

      user[key] = value;
    })

    return user
  }

  async remove(id: string) {
    const user = this.searchById(id)

    this.users = this.users.filter(userSaved => {
      return userSaved.id !== id
    })

    return user;
  }
}