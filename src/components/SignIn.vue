<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { Eye, EyeOff, XCircle } from "lucide-vue-next";
import Modal from "@/Modal.vue";

const emits = defineEmits(["switchMethod"]);

const inputPassword = ref<HTMLInputElement | null>(null);
const isPasswordVisible = ref<boolean>(false);
const isModalShow = ref<boolean>(false);

const closeModal = () => {
  isModalShow.value = false;
};

const signInForm = reactive({
  login: "",
  password: ""
});

const signInFormValidate = reactive({
  login: "",
  isValidLogin: false,
  password: "",
  isValidPassword: false
});
const switchVisibility = () => {
  switch (inputPassword.value?.getAttribute("type")) {
    case "password":
      inputPassword.value?.setAttribute("type", "text");
      isPasswordVisible.value = true;
      break;
    case "text":
      inputPassword.value?.setAttribute("type", "password");
      isPasswordVisible.value = false;
      break;
    default:
      break;
  }
};

const signIn = () => {
  try {
    if (signInFormValidate.isValidLogin && signInFormValidate.isValidPassword) {
      isModalShow.value = true;
      Object.entries(signInForm).map(([key, value]) => {
        console.log(`${key}:${value}`);
      });
    } else {
      throw new Error("Error message from form");
    }
  } catch (error) {
    console.log(error);
  }
};

const validateWatcher = (type: "login" | "password", value: string) => {
  return value.length >= 3 && value.length <= 20;
};

//Watch login
watch(
  () => signInForm.login,
  (value) => {
    const isValidName = validateWatcher("login", value);
    if (!isValidName) {
      signInFormValidate.login =
        "Имя должно быть больше 3 и меньше 20 символов";
      signInFormValidate.isValidLogin = false;
    } else {
      signInFormValidate.login = "";
      signInFormValidate.isValidLogin = true;
    }
  }
);

//Watch password
watch(
  () => signInForm.password,
  (value) => {
    const isValidPassword = validateWatcher("password", value);
    if (!isValidPassword) {
      signInFormValidate.password =
        "Пароль должен быть больше 3 и меньше 20 символов";
      signInFormValidate.isValidPassword = false;
    } else {
      signInFormValidate.password = "";
      signInFormValidate.isValidPassword = true;
    }
  }
);
</script>

<template>
  <section class="section__signin">
    <h2 class="form__header">Авторизация</h2>
    <p class="form__method" @click="$emit('switchMethod')">
      Нет аккаунта? <span class="form__method-action">Зарегистрируйтесь</span>
    </p>
    <form class="form" @submit.prevent="signIn">
      <div class="form__control">
        <input
          v-model="signInForm.login"
          placeholder="Логин:"
          class="form__input form__login"
          type="text"
          required
          maxlength="20"
          minlength="3"
        />
        <span v-if="signInFormValidate.login" class="form__validator">
          <XCircle size="20" />{{ signInFormValidate.login }}</span
        >
        <div class="form__password-container">
          <input
            ref="inputPassword"
            v-model="signInForm.password"
            placeholder="Пароль:"
            class="form__input form__password"
            type="password"
            required
            maxlength="20"
            minlength="3"
          />
          <button
            class="form__password-eye"
            type="button"
            @click="switchVisibility"
          >
            <EyeOff v-if="isPasswordVisible" class="eye" />
            <Eye v-else />
          </button>
          <span v-if="signInFormValidate.password" class="form__validator">
            <XCircle size="20" />{{ signInFormValidate.password }}</span
          >
        </div>
      </div>
      <button type="submit" class="form__submit">Авторизация</button>
      <a href="#" class="form__forgot"> Забыли пароль? </a>
    </form>
  </section>
  <Modal v-if="isModalShow" message="Вы успешно вошли!" @close="closeModal" />
</template>

<style lang="scss">
.form {
  &__forgot {
    display: inline-block;
    text-align: center;
    font-size: 1.15rem;
    font-weight: bold;
    color: $secondary-blue;
    margin-top: 2rem;
  }
}
</style>
