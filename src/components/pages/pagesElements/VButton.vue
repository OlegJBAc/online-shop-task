<template>
    <button class="v-button"
            :class="{ preloader: isLoading }"
    >
      <img class="inBasket__img" src="../../../assets/images/check.svg" alt="check svg"/>
      <span>{{ text }}</span>
    </button>
</template>

<script>

export default {
    name: "VButton",
    props: {
        text: {
            type: String,
            default: 'Text',
            required: true,
        },
        isLoading: {
          type: Boolean,
          default: false,
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">

.v-button {
  background: #403432;
  width: vw(118px);
  height: vw(48px);
  color: white;
  cursor: pointer;
  font-size: vw(14px);
  border: none;
  img{
    display: none;
  }
  &.inBasket {
    width: vw(120px);
    background: #5B3A32;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      display: block;
      width: vw(20px);
      height: w(20px);
      margin-right: vw(3px);
      margin-left: vw(8px);
    }
  }
}
.preloader {
    position: relative;
    &::after {
      position: absolute;
      content: '';
      width: calc(100% + 1px);
      height: 100%;
      top: 0;
      left: -1px;
      background: url(../../../assets/images/preloader.svg) center no-repeat;
      background-size: 100% 100%;
    }
}

</style>
