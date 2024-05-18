import {  ActionContext, Module } from "vuex/types/index.js";
import UsersApiService from "../../../services/UsersApiService";
import IUser from "../../../types/IUser";
import { State } from "../..";
import { ADD_USER_ACTION } from "../../type-actions";

export interface IStateUsers {
  users: IUser[]
}

export const userModule: Module<IStateUsers, State> = {
  actions: {
    async [ADD_USER_ACTION]({ }: ActionContext<IStateUsers, State>, user: IUser) {
      try {
        const usersService = new UsersApiService();
        await usersService.createUser(user);
      } catch (error) {
        console.error('Error adding user:', error);
        throw error;
      }
    },
  }
}