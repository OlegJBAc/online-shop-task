<template>
  <div class="footer">
    <div class="footer__container">
      <NavMenu/>

      <div class="footer__contacts">
        <div class="footer__phone">
          <img src="../../assets/images/phone-logo.svg"/>
          <span>
            +7 (495) 555-55-55
          </span>
        </div>

        <div class="footer__address">
          <img src="../../assets/images/adress-logo.svg"/>
          <span>
            г. Москва, ул. Расплетина, 24
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/appElements/NavMenu.vue";

export default {
  name: "Footer",
  components: {
    NavMenu,
  }
}
</script>
