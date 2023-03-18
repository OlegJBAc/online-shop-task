<template>

  <li class="cards__item">

    <div class="cards__image-wrapper">
      <img class="cards__image" :src="`${image}`" alt="here is picture"/>
    </div>

    <div class="cards__content">
      <h2 class="cards__title">{{ title }}</h2>
      <div class="cards__buy">
        <div  class="cards__price">
          <span>{{ price }} $</span>
        </div>
        <v-button :text="isItemInBasket ? 'В Корзине' : 'Купить'"
                  @click="changeProductInBasket"
                  :class="{ inBasket: isItemInBasket }"
                  :isLoading="buttonIsLoading"
                  :disabled="buttonIsLoading"
        />
      </div>
    </div>

  </li>

</template>

<script>
import VButton from './VButton.vue'

export default {
  components: {
    VButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    isItemInBasket: {
      type: Boolean,
      required: true,
    },
    buttonLoading: {
      type: Object,
      required: true,
    },
  },
  computed: {
    buttonIsLoading() {
      return this.buttonLoading.id === this.productId && this.buttonLoading.isLoad
    }
  },
  methods: {
    changeProductInBasket() {
      this.$emit('changeProductInBasket', this.productId, this.isItemInBasket ? 'delete' : 'send')
    },

  },
}
</script>

