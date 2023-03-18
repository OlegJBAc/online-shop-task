<template>
  <div class="header">
    <div class="header__container">

      <NavMenu/>

      <div class="header__filter">
        <input placeholder="Поиск по названию картины"/>
        <v-button class="header__filter-button"
                  text="Найти">
        </v-button>

      </div>

    </div>

  </div>
</template>

<script>
import NavMenu from "@/components/appElements/NavMenu.vue";
import VButton from "@/components/pages/pagesElements/VButton.vue";
export default {
  components: {
    VButton,
    NavMenu,
  }
}
</script>
