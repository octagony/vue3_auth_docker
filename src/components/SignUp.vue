<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { Eye, EyeOff, XCircle } from "lucide-vue-next";
import Modal from "@/Modal.vue";

const emits = defineEmits(["switchMethod"]);

const inputPassword = ref<HTMLInputElement | null>(null);
const confirmPassword = ref<HTMLInputElement | null>(null);

const isPasswordVisible = reactive({
  mainPasswordVisible: false,
  confirmPasswordVisible: false
});

const switchVisibility = (passwordType: "main" | "confirm") => {
  switch (passwordType) {
    case "main":
      inputPassword.value?.getAttribute("type") === "password"
        ? inputPassword.value?.setAttribute("type", "text")
        : inputPassword.value?.setAttribute("type", "password");
      isPasswordVisible.mainPasswordVisible =
        !isPasswordVisible.mainPasswordVisible;
      break;
    case "confirm":
      confirmPassword.value?.getAttribute("type") === "password"
        ? confirmPassword.value?.setAttribute("type", "text")
        : confirmPassword.value?.setAttribute("type", "password");

      isPasswordVisible.confirmPasswordVisible =
        !isPasswordVisible.confirmPasswordVisible;
      break;
    default:
      break;
  }
};

const isModalShow = ref<boolean>(false);

const closeModal = () => {
  isModalShow.value = false;
};

const signUpForm = reactive({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: ""
});

const signUpFormValidate = reactive({
  name: "",
  isValidName: false,
  email: "",
  isValidEmail: false,
  password: "",
  isValidPassword: false,
  passwordConfirmation: "",
  isValidPasswordConfirmation: false
});

const signUp = () => {
  try {
    if (
      signUpFormValidate.isValidName &&
      signUpFormValidate.isValidEmail &&
      signUpFormValidate.isValidPassword &&
      signUpFormValidate.isValidPasswordConfirmation
    ) {
      isModalShow.value = true;
      Object.entries(signUpForm).map(([key, value]) => {
        console.log(`${key}:${value}`);
      });
    } else {
      throw new Error("Error message from form");
    }
  } catch (error) {
    console.log(error);
  }
};

type TSignUp = "email" | "password" | "name" | "passwordConfirmation";

const validateWatcher = (type: TSignUp, value: string) => {
  switch (type) {
    case "email":
      const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        value
      );
      return isValidEmail;
    case "name":
      return value.length >= 3 && value.length <= 20;
    case "password":
      return value.length >= 3 && value.length <= 20;
    case "passwordConfirmation":
      return value === signUpForm.password;
    default:
      break;
  }
};

{
  //Watchers for fields
  //Watch Password
  watch(
    () => signUpForm.name,
    (value) => {
      const isValidName = validateWatcher("name", value);
      if (!isValidName) {
        signUpFormValidate.name =
          "Имя должно быть больше 3 и меньше 20 символов";
        signUpFormValidate.isValidName = false;
      } else {
        signUpFormValidate.name = "";
        signUpFormValidate.isValidName = true;
      }
    }
  );

  //Watch email
  watch(
    () => signUpForm.email,
    (value) => {
      const isValidEmail = validateWatcher("email", value);
      if (!isValidEmail) {
        signUpFormValidate.email = "Неверный формат email'a";
        signUpFormValidate.isValidEmail = false;
      } else {
        signUpFormValidate.email = "";
        signUpFormValidate.isValidEmail = true;
      }
    }
  );

  //Watch password
  watch(
    () => signUpForm.password,
    (value) => {
      const isValidPassword = validateWatcher("password", value);
      if (!isValidPassword) {
        signUpFormValidate.password =
          "Пароль должен быть больше 3 и меньше 20 символов";
        signUpFormValidate.isValidPassword = false;
      } else {
        signUpFormValidate.password = "";
        signUpFormValidate.isValidPassword = true;
      }
    }
  );

  //Watch passwordConfirmation
  watch(
    () => signUpForm.passwordConfirmation,
    (value) => {
      const isValidPasswordConfirmation = validateWatcher(
        "passwordConfirmation",
        value
      );
      if (!isValidPasswordConfirmation) {
        signUpFormValidate.passwordConfirmation = "Пароли должны совпадать";
        signUpFormValidate.isValidPasswordConfirmation = false;
      } else {
        signUpFormValidate.passwordConfirmation = "";
        signUpFormValidate.isValidPasswordConfirmation = true;
      }
    }
  );
}

// watch(signUpForm, (value) => {
//   //Watch email
//   if (!validateWatcher("email", value.email)) {
//     signUpFormValidate.email = "Неверный email";
//   } else {
//     signUpFormValidate.email = "";
//   }
//   //Watch name
//   if (!validateWatcher("name", value.name)) {
//     signUpFormValidate.name = "Имя должно быть больше 3 и меньше 20 символов";
//   } else {
//     signUpFormValidate.name = "";
//   }
//
//   //Watch password
//   if (!validateWatcher("password", value.password)) {
//     signUpFormValidate.password =
//       "Пароль должен быть больше 3 и меньше 20 символов";
//   } else {
//     signUpFormValidate.password = "";
//   }
//
//   //Watch passwordConfirmation
//   if (!validateWatcher("passwordConfirmation", value.passwordConfirmation)) {
//     signUpFormValidate.passwordConfirmation = "Пароли должны совпадать";
//   } else {
//     signUpFormValidate.passwordConfirmation = "";
//   }
// });
</script>

<template>
  <section class="section__signin">
    <h2 class="form__header">Регистрация</h2>
    <p class="form__method" @click="$emit('switchMethod')">
      Уже есть аккаунт? <span class="form__method-action">Войдите</span>
    </p>
    <form class="form" @submit.prevent="signUp">
      <div class="form__control">
        <input
          v-model="signUpForm.name"
          placeholder="Имя:"
          class="form__input form__login"
          type="text"
          required
          maxlength="20"
          minlength="3"
          tabindex="1"
        />
        <span v-if="signUpFormValidate.name" class="form__validator">
          <XCircle size="20" />{{ signUpFormValidate.name }}</span
        >
        <input
          v-model="signUpForm.email"
          placeholder="Email:"
          class="form__input form__login"
          type="text"
          required
          tabindex="2"
        />

        <span v-if="signUpFormValidate.email" class="form__validator">
          <XCircle size="20" />{{ signUpFormValidate.email }}</span
        >

        <div class="form__password-container">
          <input
            ref="inputPassword"
            v-model="signUpForm.password"
            placeholder="Пароль:"
            class="form__input form__password"
            type="password"
            maxlength="20"
            minlength="3"
            required
            tabindex="3"
          />
          <button
            class="form__password-eye"
            type="button"
            @click="switchVisibility('main')"
          >
            <EyeOff v-if="isPasswordVisible.mainPasswordVisible" tabindex="4" />
            <Eye v-else tabindex="4" />
          </button>
          <span v-if="signUpFormValidate.password" class="form__validator">
            <XCircle size="20" />{{ signUpFormValidate.password }}</span
          >
        </div>
        <div class="form__password-container">
          <input
            ref="confirmPassword"
            v-model="signUpForm.passwordConfirmation"
            placeholder="Повторите пароль:"
            class="form__input form__password"
            type="password"
            maxlength="20"
            minlength="3"
            required
            tabindex="5"
          />
          <button
            class="form__password-eye"
            type="button"
            @click="switchVisibility('confirm')"
          >
            <EyeOff
              v-if="isPasswordVisible.confirmPasswordVisible"
              tabindex="6"
            />

            <Eye v-else />
          </button>
          <span
            v-if="signUpFormValidate.passwordConfirmation"
            class="form__validator"
          >
            <XCircle size="20" />{{
              signUpFormValidate.passwordConfirmation
            }}</span
          >
        </div>
      </div>
      <button type="submit" class="form__submit">Зарегистрироваться</button>
    </form>
  </section>
  <Modal
    v-if="isModalShow"
    message="Вы успешно зарегистрировались!"
    @close="closeModal"
  />
</template>

<style lang="scss">
.form {
  width: 80%;
  @media (max-width: 640px) {
    width: 100%;
  }
  &__header {
    font-weight: bold;
    font-size: 2rem;
  }
  &__method {
    margin-top: 1rem;
    cursor: pointer;
    &-action {
      color: $primary-blue;
    }
  }
  &__control {
    margin-top: 1.5rem;
  }
  &__input {
    padding: 1rem 1.15rem;
    width: 100%;
    margin-top: 2rem;
    border: 1px solid rgba($color: $text-dark, $alpha: 0.2);
    border-radius: 1rem;
    outline: none;
  }
  &__password {
    &-container {
      position: relative;
      &:last-child {
        margin-bottom: 3rem;
      }
    }
    &-eye {
      border: none;
      outline: none;
      background: transparent;
      right: 20px;
      top: 44px;
      &:focus {
        border: 1px solid rgba($color: $text-dark, $alpha: 0.5);
      }
    }
  }

  &__validator {
    display: inline-block;
    color: $danger;
    padding: 0.25rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding-inline: 1rem;
  }

  &__submit {
    padding: 1rem 1.15rem;
    width: 100%;
    display: inline-block;
    background-color: $primary-blue;
    outline: none;
    border: 1px solid rgba($color: $text-dark, $alpha: 0.1);
    border-radius: 1rem;
    color: $white;
    font-size: 1.15rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    @media (hover: hover) {
      &:hover {
        color: $text-dark;
        background: $white;
        border: 1px solid rgba($color: $text-dark, $alpha: 1);
      }
    }
    &:focus {
      color: $text-dark;
      background: $white;
      border: 1px solid rgba($color: $text-dark, $alpha: 1);
    }
    @media (max-width: 640px) {
      font-size: 1.05rem;
      padding: 1rem;
    }
  }
}
</style>
