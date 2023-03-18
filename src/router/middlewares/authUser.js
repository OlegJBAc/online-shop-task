export default function authUser ({ next, store }){

    if(store.getters['products/isAuth']) {

        localStorage.removeItem('currentPagesPortion')

        return next({
            name: 'products',
            query: { page: '1' },
        })
    }

    return next()
}
