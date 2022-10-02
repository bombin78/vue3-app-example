<template>
  <div class="post">
    <div>
      <div><strong>Название</strong> {{ post.title }}</div>
      <div><strong>Описание</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button
        @click="$router.push(`${$route.path}/${post.id}`)"
      >
        Открыть
      </my-button>
      <my-button
        @click="$emit('removePost', post)"
      >
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding: 15px;
  border: 1px solid #ccc;

  &__btns {
    display: flex;
    margin-left: 20px;

    :last-child {
      margin-left: 12px;
    }
  }
}
</style>
