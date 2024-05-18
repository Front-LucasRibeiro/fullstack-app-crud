<script setup lang="ts">
import { computed} from 'vue';
import { useStore } from '../store';

const store = useStore()
const notificationData = computed(() => store.state.notificationModule.notification);

const closeModal = () => {
  notificationData.value.showInfo = false;
}

</script>

<template>
  <div class="infoModal" v-if="notificationData?.showInfo" >
    <div class="infoModal__content">
      <span class="infoModal__close" @click="closeModal">&times;</span>
      <p class="infoModal__text">
        {{ notificationData.message }}
      </p>
      <span class="infoModal__icon" :class="notificationData.status"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './src/assets/scss/variables' as var;
@import './src/assets/scss/mixins';

.infoModal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 0 14px;

  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 400;
    position: absolute;
    right: 0;
    top: 0;
    width: 34px;
    height: 34px;
    border-radius: 6px;
    border: 2px solid #efefef;
    background-color: var.$main-color;
    color: var.$sec-color;
    cursor: pointer;

    &:hover {
      background-color: var.$main-color-hover;
    }
  }

  &__text {
    max-width: 310px
  }

  &__icon {
    @include iconError;

    &.success {
      @include iconSuccess;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var.$sec-color;
    padding: 2.375rem 1rem;
    border-radius: 6px;
    width: 520px;
    font-size: 1rem;
    line-height: 1.3rem;
    text-align: center;
    max-width: 100%;
    position: relative;

    @media (max-width: 480px) {
      flex-direction: column;
      padding-bottom: 12px;
    }
  }
}
</style>
