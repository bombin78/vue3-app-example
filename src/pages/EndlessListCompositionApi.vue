<template>
  <div class="app">
    <h1>Страница с автоподгрузкой постов + composition API</h1>

    <my-input
      class="app__search"
      v-model="searchQuery"
      v-focus
      placeholder="Поиск по названию..."
    />

    <div class="app__btns">
      <my-button class="app__add-btn" @click="showDialog">
        Создать пост
      </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @createPost="createPost" />
    </my-dialog>

    <!-- computed для сортировки и поиска постов -->
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove-post="removePost"
      v-if="!isPostsLoading"
    />

    <div v-else>Идет загрузка ...</div>

    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import axios from 'axios';
import PostForm                       from "@/components/PostForm";
import PostList                       from "@/components/PostList";
import usePosts                       from "@/hooks/usePosts";
import useSortedPosts                 from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts      from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
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
    // TODO вынести в hooks
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.total = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        console.log("Ошибка");
      }
    },
  },
  setup() {
    const { posts, total, isPostsLoading } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      total,
      isPostsLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
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

.observer {
  height: 80px;
}
</style>
