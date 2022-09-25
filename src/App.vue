<template>
  <div class="app">
    <post-form @createPost="createPost" />
    <post-list :posts="posts" />
  </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Пост о JavaScript 1",
          body: "JavaScript - универсальный язык программирования 10",
        },
        {
          id: 2,
          title: "Пост о JavaScript 2",
          body: "JavaScript - универсальный язык программирования 20",
        },
        {
          id: 3,
          title: "Пост о JavaScript 3",
          body: "JavaScript - универсальный язык программирования 30",
        },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
