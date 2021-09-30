<template>
  <div class="not-found">
    페이지를 찾을 수 없습니다.
  </div>
</template>

<script>
const pageTitle = "Not Found | Vue SSR";

export default {
  name: 'NotFound',

  serverPrefetch() {
    this.$ssrContext.title = pageTitle;
  },

  mounted () {
    document.title = pageTitle;
  }
}
</script>
