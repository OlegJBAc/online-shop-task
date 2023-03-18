<template>
  <div class="app">
    <Header/>

    <div class="app__container">
      <router-view></router-view>
    </div>

    <Footer/>
  </div>

</template>

<script>
import Header from './components/appElements/Header.vue'
import Footer from "@/components/appElements/Footer.vue";

export default {
  name: 'app',
  components: {
    Footer,
    Header,
  },
  created() {

  }
}

</script>

<style lang="scss">
@import './styles/app.scss';

</style>
