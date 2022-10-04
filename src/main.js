import { createApp } 	from 'vue';
import App 				from './App.vue';
import components 		from '@/components/UI';
import directives 		from '@/directives';
import router 			from '@/router/router';
import store 			from '@/store';


const app = createApp(App);

components.forEach((item) => {
	app.component(item.name, item);
});

directives.forEach((item) => {
	app.directive(item.name, item);
});

app
	.use(router)
	.use(store)
	.mount('#app');
