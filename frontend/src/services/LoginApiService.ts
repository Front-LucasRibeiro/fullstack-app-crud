import axios from 'axios';
import ILogin from '../types/ILogin';
import IInfo from '../types/IInfo';
import { store } from '../store';
import { SEND_MESSAGE_ACTION } from '../store/type-actions';
import router from '../routes';

const BASE_URL = "http://localhost:3000";

export default class LoginApiService {
  async login(user: ILogin) {
    try {
      const response = await axios.post<ILogin>(`${BASE_URL}/authentication/login`, user);

      if (response.data.token_access && typeof response.data.token_access === 'string') {
        localStorage.setItem('tk', response.data.token_access);
        router.push('/usuarios');
      } else {
        console.error('Falha ao obter token de acesso.')
      }
    } catch (error) {
      const message: IInfo = {
        status: 'error',
        message: 'Dados de Login Inválidos!',
        showInfo: true
      }
      store.dispatch(SEND_MESSAGE_ACTION, message)

      throw error;
    }
  }
}