import { ref, computed } from 'vue';


export default function useSortedPosts(posts) {
	const selectedSort = ref('');

	// Создаем новый массив для сортировки, чтобы не мутировать posts
	const sortedPosts = computed(() => [...posts.value].sort((post1, post2) => {
        return post1[selectedSort.value]?.localeCompare(
          post2[selectedSort.value]
        );
      })
	);

	return {
		selectedSort,
		sortedPosts,
	};
}