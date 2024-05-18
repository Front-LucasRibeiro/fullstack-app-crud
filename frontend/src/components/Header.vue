<script setup lang="ts">
const logOut = () => {
  localStorage.removeItem('tk');
}
</script>

<template>
  <header class="header">
    <router-link to="/usuarios">
      <img src="../assets/img/favicon.ico" alt="Registration System Logo" class="header__logo" />
    </router-link>
    <nav class="header__nav">
      <ul>
        <li>
          <router-link to="/usuarios">
            Usuários
          </router-link>
        </li>
        <li>
          <router-link to="/" @click="logOut">
            Sair
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use './src/assets/scss/variables' as var;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var.$main-color;
  height: 56px;
  box-shadow: 2px 2px 22px #bbb;
  padding: 0 1.375rem;
  background-color: #fefefe;

  &__logo {
    width: 42px;
  }

  &__nav {
    ul {
      display: flex;
      gap: 16px;

      li {
        a {
          color: #111;
          text-decoration: none;
          font-size: 1rem;
          transition: .5s;

          &:hover {
            color: #111;
            font-weight: 500;
            padding-bottom: 5px;
            transition: .5s;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
