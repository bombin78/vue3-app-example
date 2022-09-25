<template>
  <div>
    <h3>Список пользователей</h3>
    <PostItem
      key="post.id"
      class="post"
      v-for="post in posts"
      :post="post"
    />
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";

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

<style scoped></style>
