import { InjectionKey } from "vue";
import { userModule, IStateUsers } from "./modules/users"; 
import { IStateNotifications, notificationModule } from "./modules/notifications";
import { Store, createStore, useStore as sourceStore } from "vuex";

export interface State {
  usersList: IStateUsers 
  notificationData: IStateNotifications
}


export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    usersList: {
      users: [],
    },
    notificationData: {
      notification: {
        showInfo: false,
        message: '',
        status: ''
      }
    }
  },
  modules: {
    userModule,
    notificationModule
  }
})


export function useStore(): Store<State> {
  return sourceStore(key)
}