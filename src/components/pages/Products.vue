<template>

  <div class="products">

    <div class="products__content" v-if="!pageLoading">
      <h2 class="products__title">
        Товары
      </h2>
      <button class="show-paginator"
              :class="{ shown: isShowPaginator}"
              @click="showPaginator"
      >
        {{isShowPaginator ? 'Скрыть' : 'Показать'}} пагинатор
      </button>
      <Paginator v-if="isShowPaginator"
                 :totalItemsCount="getProductsComputed.length"
                 @changePage="setCurrentPageProducts"
                 :currentPage="currentPage"
                 :pageSize="pageSize"
      />
      <div class="cards">


      <!--    For RTB     -->


        <ul class="cards__list">
          <ProductCard v-for="product in currentPageProducts"
                       :title="product.title"
                       :image="product.images[0]"
                       :price="product.price"
                       :productId="product.id"
                       :isItemInBasket="isItemInBasket(product.id)"
                       :buttonLoading="buttonLoading"
                       @changeProductInBasket="changeProductInBasket"

          />
        </ul>
      </div>
    </div>
    <Loader v-else class="page__loader">
      ...loading
    </Loader>

  </div>

</template>

<script>

import {defineAsyncComponent} from "vue";

import VButton from "@/components/pages/pagesElements/VButton.vue";
import ProductCard from "@/components/pages/pagesElements/ProductCard.vue";
import { mapActions } from "vuex";
import Loader from "@/components/appElements/Loader.vue";

const Paginator = defineAsyncComponent(() => import( /* webpackChunkName: "Paginator" */"@/components/pages/pagesElements/Paginator.vue"))

export default {
  components: {
    Loader,
    Paginator,
    ProductCard,
    VButton,
  },
  data() {
    return {
      currentPage: null,
      idItemsInBasket: [],
      currentPageProducts: [],
      pageSize: 8,

      buttonLoading: {
        id: 0,
        isLoad: false,
      },
      pageLoading: false,

      isShowPaginator: false,
    }
  },
  computed: {
    getProductsComputed() {
      return this.$store.state.products.products
    },
  },
  methods: {
    ...mapActions('products', [
      'getProducts',
    ]),

    showPaginator() {
      this.isShowPaginator = !this.isShowPaginator
    },
    setCurrentPageProducts(page) {
      const firstCurrentPageProduct = (page - 1) * this.pageSize
      const lastCurrentPageProduct = firstCurrentPageProduct + this.pageSize

      this.currentPageProducts = this.getProductsComputed.slice(firstCurrentPageProduct, lastCurrentPageProduct)
      this.currentPage = page
      this.$router.push({name: 'products', query: { page: this.currentPage }})
    },


    checkLocalStorageBasket() {
      const localStorageBasket = localStorage.getItem('basketProducts')

      return localStorageBasket ? JSON.parse(localStorageBasket) : null
    },

    setButtonLoading(productId, isLoading) {
      this.buttonLoading = {
        id: productId,
        isLoad: isLoading,
      }
    },

    changeBasket(productId, localStorageBasket) {
      this.idItemsInBasket = localStorageBasket
      localStorage.setItem('basketProducts', JSON.stringify(localStorageBasket))
      this.setButtonLoading(productId, false)
    },

    async changeProductInBasket(productId, actionType) {
      this.setButtonLoading(productId, true)
      const response = await axios.get(`/products?limit=100`)

      if(response.status === 200) {
        let localStorageHasBasket = this.checkLocalStorageBasket()

        if(localStorageHasBasket) {
          actionType === 'delete'
                  ? localStorageHasBasket = localStorageHasBasket.filter(productIdItem => productIdItem !== productId)
                  : localStorageHasBasket.push(productId)
         this.changeBasket(productId, localStorageHasBasket)
        }else{
          const localStorageHasBasket = []
          localStorageHasBasket.push(productId)
          this.changeBasket(productId, localStorageHasBasket)
        }
      }else{
        console.error('some error with sendProductInBasket')
        this.setButtonLoading(productId, false)

      }
    },

    isItemInBasket(productId) {
      return this.idItemsInBasket.includes(productId)
    },
  },

  created() {
    const initializePage = async () => {
      this.pageLoading = true
      const response = await this.getProducts()
      if(response) {
        this.currentPage = Number(this.$route.query.page)

        const localStorageHasBasket = this.checkLocalStorageBasket()
        if(localStorageHasBasket) this.idItemsInBasket = localStorageHasBasket

        this.pageLoading = false

        this.setCurrentPageProducts(this.currentPage)
      }
    }

    initializePage()

  }
}
</script>



