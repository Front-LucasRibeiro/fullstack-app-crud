
<template>
  <footer class="footer">
    <p>&copy; Lucas Maranho - Todos os direitos reservados.</p>
  </footer>
</template>

<style scoped lang="scss">
@use './src/assets/scss/variables' as var;

.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 82px;
  background-color: var.$main-color;
  color: var.$sec-color;
  padding: 0 1.375rem;
  box-shadow: 0 -4px 24px #666;
  text-align: center;
  font-size: 1rem;
  line-height: 1.4rem;
}
</style>
