<script setup lang="ts">
import { CheckCircle2, X } from "lucide-vue-next";
const props = defineProps<{
  message: string;
}>();
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="modal__wrapper" @click.self="$emit('close')">
    <div class="modal__container">
      <div class="modal__content">
        <p class="modal__message">{{ props.message }}</p>
        <CheckCircle2 size="60" class="modal__icon" />
        <button class="modal__close" @click="$emit('close')">
          <X />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  &__wrapper {
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: $text-dark, $alpha: 0.5);
    display: grid;
    place-items: center;
  }
  &__container {
    background: $white;
    padding: 4rem 5rem;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    border-radius: 1.25rem;
    position: relative;
    margin-inline: 1rem;
    @media (max-width: 640px) {
      font-size: 1.5rem;
      padding: 0.5rem;
      margin-inline: 0.5rem;
      word-wrap: break-word;
    }
  }
  &__message {
    margin-block: 1rem;
  }
  &__icon {
    color: $primary-blue;
  }
  &__close {
    position: absolute;
    background: none;
    outline: none;
    border: none;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
}
</style>
