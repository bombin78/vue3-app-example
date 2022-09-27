<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button
      class="add-post"
      @click="showDialog"
    >
      Создать пост
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form @createPost="createPost" />
    </my-dialog>
    <post-list 
      :posts="posts"
      @remove-post="removePost"
    />
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
      dialogVisible: false,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
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

.add-post {
  margin-top: 15px;
  margin-bottom: 30px;
}
</style>
