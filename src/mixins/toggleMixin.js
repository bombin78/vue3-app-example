export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		hideDialog() {
			this.$emit('update:show', false);
		},
	},
	// Демонстрация работы миксина, смотри вывод в консоль
	mounted() {
		console.log('toggleMixin mounted');
	},
	// ...
}
