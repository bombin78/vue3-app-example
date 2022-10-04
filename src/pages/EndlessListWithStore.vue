<template>
  <div class="app">
    <h1>Страница с автоподгрузкой постов + store</h1>

    <!-- Из-за использования store "vuex", "v-model" для "searchQuery" здесь использовать нельзя -->
    <my-input
      class="app__search"
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      v-focus
      placeholder="Поиск по названию..."
    />

    <div class="app__btns">
      <my-button class="app__add-btn" @click="showDialog">
        Создать пост
      </my-button>
      <!-- Из-за использования store на "vuex", "v-model" для "selectedSort" здесь использовать нельзя -->
      <my-select
        class="app__sort"
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions" 
      />
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
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "list/setPage",
      setSearchQuery: "list/setSearchQuery",
      setSelectedSort: "list/setSelectedSort",
    }),
    ...mapActions({
      fetchPosts: "list/fetchPosts",
      loadMorePosts: "list/loadMorePosts",
    }),
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
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.list.posts,
      searchedPosts: (state) => state.list.searchedPosts,
      isPostsLoading: (state) => state.list.isPostsLoading,
      selectedSort: (state) => state.list.selectedSort,
      searchQuery: (state) => state.list.searchQuery,
      page: (state) => state.list.page,
      limit: (state) => state.list.limit,
      total: (state) => state.list.total,
      sortOptions: (state) => state.list.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "list/sortedPosts",
      sortedAndSearchedPosts: "list/sortedAndSearchedPosts",
    }),
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
