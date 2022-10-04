import { createStore } from "vuex";
import { listModule } from "./listModule";

export default createStore({
	modules: {
		list: listModule,
	}
});
