<template>
  <div>
    <AppHeader />
    <div class="container ui">
      <router-view />
    </div>
  </div>
</template>
<script>
import AppHeader from "./components/AppHeader.vue"; //@=src

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>
<style></style>
