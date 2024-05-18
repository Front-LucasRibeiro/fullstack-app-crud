import { ActionContext, Module } from "vuex/types/index.js"
import { State } from "../.."
import IInfo from "../../../types/IInfo"
import { INFO_MESSAGE_MUTATION } from "../../type-mutations"
import { SEND_MESSAGE_ACTION } from "../../type-actions"

export interface IStateNotifications {
  notification: IInfo
}

export const notificationModule: Module<IStateNotifications, State> = {
  mutations: {
    [INFO_MESSAGE_MUTATION](state: IStateNotifications, newNotification: IInfo){
      state.notification = { ...newNotification }
    }
  },
  actions: {
    async [SEND_MESSAGE_ACTION]({ commit }: ActionContext<IStateNotifications, State>, getMessage: IInfo){
      try {
        commit(INFO_MESSAGE_MUTATION, getMessage)
      } catch (error) {
        console.error('Error send message', error);
      }
    }
  }
}
