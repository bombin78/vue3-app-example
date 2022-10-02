<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixins from '@/mixins/toggleMixin';

export default {
  name: "my-dialog",
  mixins: [toggleMixins],
  	// Демонстрация работы миксина, смотри вывод в консоль
	mounted() {
		console.log('nodal MyDialog mounted');
	},
};
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);

  &__content {
    margin: auto;
    padding: 20px;
    min-height: 50px;
    min-width: 420px;

    background: white;
    border-radius: 4px;
  }
}
</style>
