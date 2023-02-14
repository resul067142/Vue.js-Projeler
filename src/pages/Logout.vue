<template>
  <div>
<H1>çıkış yapılıyor</H1>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "Logout",
   created() {
    localStorage.removeItem("login");
    // this.$store.commit("setUser", {});
    this.setUser({});
    this.$router.push("/login");
   },
  methods: {
      ...mapActions(["setUser"]),
  },
}
</script>

<style scoped>

</style>
