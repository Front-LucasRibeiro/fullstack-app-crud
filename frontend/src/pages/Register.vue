<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store';
import { ADD_USER_ACTION } from '../store/type-actions';
import { z } from 'zod';
import IUser from '../types/IUser';

const textChangePassword = ref('password');
const fieldPassword = ref('');
const fieldEmail = ref('');
const fieldName = ref('');
const store = useStore();

const errors: any = ref({
  name: '',
  email: '',
  password: '',
});

const cadastrar = async () => {
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
    store.dispatch(ADD_USER_ACTION, user);

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

const changeViewPassword = (e: Event) => {
  e.preventDefault();

  if (textChangePassword.value === 'password') {
    textChangePassword.value = 'text';
  } else {
    textChangePassword.value = 'password';
  }
};
</script>

<template>
  <section class="login">
    <h1 class="title">Cadastrar</h1>
    <form @submit.prevent="cadastrar" class="login__form">
      <fieldset class="login__field">
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" v-model="fieldName" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </fieldset>
      <fieldset class="login__field">
        <label for="email">E-mail:</label>
        <input type="text" id="email" name="email" v-model="fieldEmail" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </fieldset>
      <fieldset class="login__field">
        <label for="password">Senha:</label>
        <div class="login__field--password">
          <input :type="textChangePassword" id="password" name="password" v-model="fieldPassword" />
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
          <button class="login__field--btnShowPassword" :class="textChangePassword" title="Ver senha"
            @click="changeViewPassword"></button>
        </div>
      </fieldset>

      <button type="submit" class="button">Cadastrar</button>
      <br /><br />
      <p class="login__form--registro">
        Voltar para <router-link to="/">login</router-link>
      </p>
    </form>
  </section>
</template>

<style scoped lang="scss">
@use './src/assets/scss/variables' as var;
@import './src/assets/scss/mixins';

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var.$main-color;
  height: 100vh;
  padding: 0 14px;

  @include button(var.$main-color, var.$main-color-hover, var.$sec-color);
  @include title(var.$sec-color);

  .error{
    margin-top: 8px;
  }

  .title {
    margin-bottom: 1.375rem;
  }

  .login__form {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 22px;
    background-color: #ededed;
    width: 100%;
    max-width: 310px;

    &--registro {
      line-height: 18px;

      a {
        color: var.$main-color;
      }
    }
  }

  .login__field {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 0 1rem;

    &--password {
      position: relative;
    }

    &--btnShowPassword {
      position: absolute;
      right: 12px;
      top: 8px;
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      border: 0;
      cursor: pointer;
      background-image: url(var.$iconHidePassword);

      &.text {
        background-image: url(var.$iconShowPassword);
      }
    }

    label {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 0.9rem;
    }

    input {
      border: 1px solid #ccc;
      background-color: #fefefe;
      outline: 0;
      height: 42px;
      border-radius: 6px;
      padding: 8px 14px;
      color: #111;
      width: 100%;
    }

    .error {
      color: red;
      font-size: 0.8rem;
      margin-bottom: 10px;
    }
  }
}
</style>