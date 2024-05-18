<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { z } from 'zod';
import IUser from '../types/IUser';
import { useRoute } from 'vue-router';
import UsersApiService from '../services/UsersApiService';

const route = useRoute()
const userId = computed(() => route.params.id);

const errors: any = ref({
  name: '',
  email: '',
  password: '',
});

const fieldPassword = ref('');
const fieldEmail = ref('');
const fieldName = ref('');

const userService = new UsersApiService();


const saveUser = async () => {
  const schema = z.object({
    name: z.string({ message: 'Campo Obrigatório' })
      .nonempty({ message: 'Campo Obrigatório' })
      .min(3, { message: 'Campo deve ter no mínimo 3 caracteres' })
      .max(100, { message: 'Campo deve ter no máximo 100 caracteres' }),
    email: z.string({ message: 'Campo Obrigatório' })
      .nonempty({ message: 'Campo Obrigatório' })
      .email({ message: 'Formato de e-mail inválido' })
      .min(3, { message: 'Campo deve ter no mínimo 3 caracteres' })
      .max(70, { message: 'Campo deve ter no máximo 70 caracteres' }),
    password: z.string({ message: 'Campo Obrigatório' })
      .nonempty({ message: 'Campo Obrigatório' })
      .min(6, { message: 'Campo deve ter no mínimo 6 caracteres' })
      .max(255, { message: 'Campo deve ter no máximo 255 caracteres' }),
  });

  const user: IUser = {
    name: fieldName.value,
    email: fieldEmail.value,
    password: fieldPassword.value,
  };

  const validationResult = schema.safeParse(user);

  if (validationResult.success) {
    userService.changeDataUser(user, userId.value)

    fieldEmail.value = ''
    fieldName.value = ''
    fieldPassword.value = ''

    errors.value = {};
  } else {
    errors.value = {};
    validationResult.error.errors.forEach(error => {
      errors.value[error.path[0]] = error.message;
    });
  }
};

const getDataUser = () => {
  const dataString = sessionStorage.getItem('editUser');
  const data = dataString ? JSON.parse(dataString) : null;

  fieldName.value = data.name
  fieldEmail.value = data.email
}

onMounted(() => {
  getDataUser();
})

</script>

<template>
  <section class="edit container">

    <h1 class="title">Edição de Usuários</h1>

    <form @submit.prevent="saveUser">
      <section class="edit__sectionForm">
        <h2 class="subTitle">Dados pessoais:</h2>

        <div class="edit__form">
          <fieldset>
            <label for="name">*Nome:</label>
            <input type="text" id="name" v-model="fieldName" />
            <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
          </fieldset>
          <fieldset>
            <label for="email">*Email:</label>
            <input type="text" id="email" v-model="fieldEmail" />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </fieldset>
          <fieldset>
            <label for="password">*Senha:</label>
            <input type="text" id="password" v-model="fieldPassword" />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </fieldset>
        </div>
      </section>

      <button class="button" type="submit">Salvar</button>
    </form>
  </section>
</template>

<style scoped lang="scss">
@use './src/assets/scss/variables' as var;
@import './src/assets/scss/mixins';

@include title(#666);
@include button(var.$main-color, var.$main-color-hover, var.$sec-color);

.error-message {
  color: tomato;
  font-size: 0.8rem;
  margin-top: 4px;
}

.edit {
  max-width: 1200px;
  margin: 48px auto;

  .button {
    max-width: 310px;
    display: block;
    margin: 32px auto 0;
  }

  &__sectionForm {
    margin-top: 42px;
  }

  &__form {
    margin-top: 22px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;

    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .subTitle {
    font-weight: 600;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 0.875rem;
    }

    input {
      height: 42px;
      padding: 4px 14px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }
  }
}
</style>
