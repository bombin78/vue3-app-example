<template>
  <div class="app">
    <h1>Страница с постами</h1>

    <my-input class="app__search" v-model="searchQuery" placeholder="Поиск..." />

    <div class="app__btns">
      <my-button class="app__add-btn" @click="showDialog">
        Создать пост
      </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @createPost="createPost" />
    </my-dialog>

    <!-- При использовании computed для сортировки -->
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove-post="removePost"
      v-if="!isPostsLoading"
    />

    <!-- При использовании watch для сортировки -->
    <!-- <post-list
      :posts="posts"
      @remove-post="removePost"
      v-if="!isPostsLoading"
    /> -->

    <div v-else>Идет загрузка ...</div>
  </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = response.data;
      } catch (e) {
        console.log("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      // Создаем новый массив для сортировки
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  // Тоже самое поведение для сортировки с помощью watch
  // watch: {
  //   selectedSort(newValue) {
  //     // Мутируем исходный массив posts
  //     this.posts.sort((post1, post2) => {
  //       return post1[newValue]?.localeCompare(post2[newValue]);
  //       // или
  //       // return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
  //     });
  //   },
  // }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;

  &__search {
    margin-top: 15px;
  }

  &__btns {
    display: flex;
    justify-content: space-between;
    margin: {
      top: 15px;
      bottom: 30px;
    }
  }
}
</style>
