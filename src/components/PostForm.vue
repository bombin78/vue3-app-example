<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input 
      v-model="post.title"
      class="input"
      type="text"
      placeholder="Название"
    />
    <my-input
      v-model="post.body"
      type="text"
      class="input"
      placeholder="Описание"
    />
    <my-button
      class="btn"
      @click="createPost"
    >
      Создать
    </my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('createPost', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
  },
  // Пример отслеживания объекта через watch
  // watch: {
  //   post: {
  //     handler(newVal) {
  //       console.log(newVal)
  //     },
  //     deep: true, // Глубокое отслеживание
  //   }
  // },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.input {
  margin-top: 15px;
}

.btn {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
