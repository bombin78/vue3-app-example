import { 
	createRouter,
	createWebHistory,
}								from 'vue-router';
import Main						from '@/pages/Main';
import About					from '@/pages/About';
import EndList					from '@/pages/EndList';
import EndlessList				from '@/pages/EndlessList';
import ListItem					from '@/pages/ListItem';


const routes = [
	{
		path: '/',
		component: Main,
	},
	{
		path: '/about',
		component: About,
	},
	{
		path: '/end-list',
		component: EndList,
	},
	{
		path: '/endless-list',
		component: EndlessList,
	},
	{
		path: '/end-list/:id',
		component: ListItem,
	},
	{
		path: '/endless-list/:id',
		component: ListItem,
	},
];

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL),
});

export default router;
