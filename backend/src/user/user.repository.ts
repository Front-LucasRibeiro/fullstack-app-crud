import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [
    {id:1, name: "xx", password: '123', email: "dasd", createdAt: "ds", deletedAt: "", updateAt: "cd"}
  ];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list(): Promise<UserEntity[]> {
    return this.users;
  }

  async update(id: string, newData: Partial<UserEntity>) {
    return this.users;
  }

  async remove(id: string) {
    return this.users;
  }
}