<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <input
      v-bind:value="post.title"
      @input="post.title = $event.target.value"
      class="input"
      type="text"
      placeholder="Название"
    />
    <input
      v-model="post.body"
      class="input"
      type="text"
      placeholder="Описание"
    />
    <button class="btn" @click="createPost">Создать</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost () {
      this.post.id = Date.now();
      this.$emit('createPost', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.input {
  margin-top: 15px;
  padding: 10px 15px;
  width: 100%;

  border: 1px solid teal;
}

.btn {
  align-self: flex-end;
  margin-top: 15px;
  padding: 10px 15px;

  background: none;
  border: 1px solid teal;
  color: teal;
}
</style>
