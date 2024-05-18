<template>
  <section class="notFound container">
    <h1 class="title">Página Não Encontrada</h1>
    <br>
    <p class="notFound__error">4<span>0</span>4</p>
    
    <p class="notFound__text">A página que você tentou acessar não foi encontrada. Talvez nosso menu no topo possa ajudar a encontrar o que procura!</p>
  </section>
</template>

<style scoped lang="scss">
@use './src/assets/scss/variables' as var;
@import './src/assets/scss/mixins';

.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 14px;
  height: 100%;

  &__text{
    text-align: center;
  }

  &__error{
    position: relative;
    display: block;
    width: 100%;
    text-align: center;
    font-size: 12.5rem;
    font-weight: 800;
    margin-bottom: 1.875rem;
    color: var.$main-color;

    @media (max-width: 520px){
      font-size: 7.5rem;
    }

    span{
      color: #bbb;
    }
  }

  @include title(#666);
}
</style>
