<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <post-item
      class="post"
      v-for="post in posts"
      :post="post"
      key="post.id"
      @remove-post="$emit('removePost', post)"
    />
  </div>
  <div
    class="empty"
    v-else
  >
    Список постов пуст
  </div>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
  .empty {
    margin-top: 30px;

    color: red;
    font-size: 24px;
    text-align: center;
  }
</style>
