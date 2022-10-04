<template>
  <div class="navbar">
    <div 
      class="navbar__logo" 
      @click="$router.push('/')"
    >
      Vue3 example
    </div>
    <div class="navbar__btns">
		<my-button @click="$router.push('/about')">
		О проекте
		</my-button>
		<my-button @click="$router.push('/end-list')">
			Список с пагинацией
		</my-button>
		<my-button @click="$router.push('/endless-list')">
			Список с автоподгрузкой
		</my-button>
		<my-button @click="$router.push('/endless-list-store')">
			Список + store
		</my-button>
		<my-button @click="$router.push('/endless-list-composition-api')">
			Список + Composition API
		</my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 50px;

  background: #ddd;
  box-shadow: 2px 2px 4px #333;

  .btn {
	margin-left: 20px;
    background: transparent;
    color: #777;
	border-color: #777;
  }

  &__logo {
    cursor: pointer;
  }

  &__btns {
	  margin-left: auto;
  }
}
</style>
