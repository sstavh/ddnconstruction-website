<template>
  <header class="page-header">
    <div>
      <p class="page-header__label">Калькулятор ремонту</p>
      <h1 class="page-header__title">Розрахуйте ремонт по кімнатах</h1>
    </div>

    <div class="page-header__actions">
      <button class="top-button top-button--light" :disabled="!canGoBack" @click="$emit('back')">
        Назад
      </button>
      <button class="top-button top-button--dark" :disabled="!canGoNext" @click="$emit('next')">
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

<style scoped>
.page-header {
  max-width: 1320px;
  margin: 0 auto 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.page-header__label {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--muted);
}

.page-header__title {
  margin: 0;
  font-size: 34px;
  line-height: 1.15;
}

.page-header__actions {
  display: flex;
  gap: 12px;
}

.top-button {
  min-width: 120px;
  border-radius: 999px;
  padding: 14px 18px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;
}

.top-button--light {
  background: #fff;
  border: 1px solid var(--border);
}

.top-button--dark {
  background: var(--accent);
  color: #fff;
}

.top-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .page-header__title {
    font-size: 28px;
  }
}
</style>
