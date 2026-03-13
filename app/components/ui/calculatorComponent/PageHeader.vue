<template>
  <header class="page-header">
    <div>
      <p class="page-header__label">Калькулятор ремонту</p>
      <h1 class="page-header__title">Розрахуйте вартість ремонту під ключ</h1>
    </div>

    <div class="page-header__actions">
      <button class="top-button top-button--light" :disabled="!can-go-back" @click="$emit('back')">
        Назад
      </button>
      <button class="top-button top-button--dark" :disabled="!can-go-next" @click="$emit('next')">
        Далі
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  step: number
  totalSteps: number
  canGoBack: boolean
  canGoNext: boolean
}>()

defineEmits<{
  (e: 'back'): void
  (e: 'next'): void
}>()
</script>