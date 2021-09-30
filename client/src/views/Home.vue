<template>
  <div class="home">
    <HelloWorld msg="Vue Simple SSR" />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

const pageTitle = "HOME | Vue SSR";

export default {
  name: 'Home',

  components: { HelloWorld },

  serverPrefetch() {
    this.$ssrContext.title = pageTitle;
  },

  mounted () {
    document.title = pageTitle;
  }
}
</script>
