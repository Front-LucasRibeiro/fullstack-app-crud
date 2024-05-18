<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '../routes';
import UsersApiService from '../services/UsersApiService';
import IUser from '../types/IUser';

const listUsers = ref<IUser[]>([]);
const userApiService = new UsersApiService();

const getUsers = async () => {
  const usersDataList = await userApiService.getUsersList();
  listUsers.value = usersDataList;
};

const editUser = (userId: string | undefined, user: IUser) => {
  router.push(`/usuarios/editar/${userId}`);
  sessionStorage.setItem('editUser', JSON.stringify(user))
};

const deleteUser = async (userId: string | undefined) => {
  await userApiService.deleteUser(userId);
  listUsers.value = listUsers.value.filter(user => user.id !== userId);
};

onMounted(() => {
  getUsers();
});
</script>

<template>
  <section class="list container">
    <h1 class="title">Tabela de Usuários</h1>
    <div class="list__tableWrap">
      <table class="list__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in listUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="button" @click="editUser(user.id, user)">Editar</button>
            </td>
            <td>
              <button class="button" @click="deleteUser(user.id)">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use './src/assets/scss/variables' as var;
@import './src/assets/scss/mixins';

@include title(#666);
@include button(var.$main-color, var.$main-color-hover, var.$sec-color);

.button {
  height: 36px;
  padding: 0 8px;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 48px auto;

  &__tableWrap {
    max-width: 1200px;
    width: 100%;
    margin: 22px auto 0;
    overflow-x: auto;
  }

  &__table {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 22px;
    border-collapse: collapse;
    margin: 0 auto;
    width: 100%;

    thead {
      background-color: #ddd;
    }

    th {
      font-weight: bold;
      padding: 8px 12px;
      font-size: 0.875rem;
    }

    td {
      padding: 12px;
      font-size: 0.95rem;

      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    td,
    th {
      text-align: center;
      border: 1px solid #ddd;
      vertical-align: middle;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
