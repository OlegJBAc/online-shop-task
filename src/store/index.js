import { createStore } from 'vuex'
import productsModule from "@/store/modules/productsModule";


export default new createStore({
  modules: {
    products: productsModule
  }
})
