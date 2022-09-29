<template>
  <div v-if="posts.length > 0">

    <h3>Список постов</h3>

    <transition-group name="posts">
      <post-item
        class="post"
        v-for="post in posts"
        :post="post"
        key="post.id"
        @remove-post="$emit('removePost', post)"
      />
    </transition-group>

  </div>

  <div class="empty" v-else>Список постов пуст</div>
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

<style scoped>

.empty {
  margin-top: 30px;

  color: red;
  font-size: 24px;
  text-align: center;
}

.posts-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-enter-active,
.posts-leave-active {
  transition: all 0.5s ease;
}
.posts-enter-from,
.posts-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.posts-move {
  transition: transform 0.5s ease;
}
</style>
