<script setup lang="ts">
import SignIn from "@/SignIn.vue";
import SignUp from "@/SignUp.vue";
import { ref } from "vue";

const isLogin = ref<boolean>(false);

const switchReg = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <div class="container">
    <SignIn v-if="isLogin" @switch-method="switchReg" />
    <SignUp v-else @switch-method="switchReg" />
  </div>
</template>

<style lang="scss">
.container {
  display: grid;
  place-items: center;
  max-width: $content-max-width;
  margin-inline: auto;
  height: 100vh;
}
</style>
