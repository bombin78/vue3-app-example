import axios from "axios";


export const listModule = {
	state: () => ({
		posts: [],
		searchedPosts: [],
		isPostsLoading: false,
		selectedSort: "",
		searchQuery: "",
		page: 1,
		limit: 10,
		total: 0,
		sortOptions: [
			{ value: "title", name: "По названию" },
			{ value: "body", name: "По содержимому" },
		],
	}),
	getters: {
		sortedPosts(state) {
			return [...state.posts].sort((post1, post2) => {
				return post1[state.selectedSort]?.localeCompare(
					post2[state.selectedSort]
				);
			});
		},
		sortedAndSearchedPosts(state, getters) {
			return getters.sortedPosts.filter((post) =>
				post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
			);
		},
	},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setLoading(state, loadingVal) {
			state.isPostsLoading = loadingVal;
		},
		setSelectedSort(state, sortVal) {
			state.selectedSort = sortVal;
		},
		setSearchQuery(state, queryVal) {
			state.searchQuery = queryVal;
		},
		setPage(state, pageVal) {
			state.page = pageVal;
		},
		setTotal(state, totalVal) {
			state.total = totalVal;
		},
	},
	actions: {
		async fetchPosts({ state, commit }) {
			try {
				commit('setLoading', true);
				const response = await axios.get(
					"https://jsonplaceholder.typicode.com/posts",
					{
						params: {
							_page: state.page,
							_limit: state.limit,
						},
					}
				);
				commit('setTotal', Math.ceil(response.headers["x-total-count"] / state.limit));
				commit('setPosts', response.data);
			} catch (e) {
				console.log("Ошибка");
			} finally {
				commit('setLoading', false);
			}
		},
		async loadMorePosts({ state, commit }) {
			try {
				commit('setPage', state.page += 1);
				const response = await axios.get(
					"https://jsonplaceholder.typicode.com/posts",
					{
						params: {
							_page: state.page,
							_limit: state.limit,
						},
					}
				);
				commit('setTotal', Math.ceil(response.headers["x-total-count"] / state.limit));
				commit('setPosts', [...state.posts, ...response.data]);
			} catch (e) {
				console.log("Ошибка");
			}
		},
	},
	namespaced: true,
}
