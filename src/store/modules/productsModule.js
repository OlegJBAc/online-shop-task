
const productsModule = {
    namespaced: true,
    state: {
        products: [],
        isAuth: true,
    },
    getters: {
        isAuth(state) {
            return state.isAuth
        },
        products(state) {
            return state.products
        },

    },
    mutations: {
        SET_PRODUCTS(state, data) {
            return state.products = data
        },

    },
    actions: {
        async getProducts(context) {
            const response = await axios.get('/products?limit=100')
            if(response.status === 200){
                this.products = response.data.products
                context.commit('SET_PRODUCTS', response.data.products)
                return true
            }else{
                console.error('error in getProducts request')
                return false
            }
        },

    },
}

export default productsModule
