import axios from 'axios';
import IUser from '../types/IUser';
import { store } from '../store';
import IInfo from '../types/IInfo';
import { SEND_MESSAGE_ACTION } from '../store/type-actions';

const BASE_URL = "http://localhost:3000";

export default class UsersApiService {
  async getUsersList(): Promise<IUser[]> {
    try {
      const token = localStorage.getItem('tk');

      const response = await axios.get<IUser[]>(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch Users data');
    }
  }

  async createUser(user: IUser): Promise<IUser> {
    try {
      const response = await axios.post<IUser>(`${BASE_URL}/users`, user);
      const message: IInfo = {
        status: 'success',
        message: 'Usuário cadastrado com sucesso!',
        showInfo: true
      }
      store.dispatch(SEND_MESSAGE_ACTION, message)

      return response.data;
    } catch (error: any) {

      if (error.response.data.statusCode === 400) {
        const message: IInfo = {
          status: 'error',
          message: error.response.data.message,
          showInfo: true
        }
        store.dispatch(SEND_MESSAGE_ACTION, message)

        throw new Error('Failed to create User');
      } else {
        
        const message: IInfo = {
          status: 'error',
          message: 'Erro ao cadastrar os dados do usuário, tente novamente mais tarde!',
          showInfo: true
        }
        store.dispatch(SEND_MESSAGE_ACTION, message)
  
        throw new Error('Failed to create User');
      }
    }
  }

  async changeDataUser(user: IUser, id: string | string[]): Promise<IUser> {
    try { 
      const token = localStorage.getItem('tk');

      const response = await axios.put<IUser>(`${BASE_URL}/users/${id}`, user, { 
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const message: IInfo = {
        status: 'success',
        message: 'Usuário alterado com sucesso!',
        showInfo: true
      }
      store.dispatch(SEND_MESSAGE_ACTION, message)

      return response.data;
    } catch (error) {
      
      const message: IInfo = {
        status: 'error',
        message: 'Erro ao editar os dados do usuário, tente novamente mais tarde!',
        showInfo: true
      }
      store.dispatch(SEND_MESSAGE_ACTION, message)

      throw new Error('Failed edit User');
    }
  }

  async deleteUser(id: string | undefined) {
    try {
      const token = localStorage.getItem('tk');

      const response = await axios.delete<IUser>(`${BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const message: IInfo = {
        status: 'success',
        message: 'Usere removido com sucesso!',
        showInfo: true
      }
      store.dispatch(SEND_MESSAGE_ACTION, message)

      return response.data;
    } catch (error) {
      const message: IInfo = {
        status: 'error',
        message: 'Não foi possível remover o Usere, tente novamente mais tarde!',
        showInfo: true
      }
      store.dispatch(SEND_MESSAGE_ACTION, message)

      throw new Error('Failed get User by Id');
    }
  }
}

