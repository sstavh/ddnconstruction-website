<template>
  <header class="page-header">
    <div>
      <p class="page-header__label">Project Cost Calculator</p>
      <h1 class="page-header__title">Estimate Your Renovation Cost by Room
</h1>
    </div>

    <div class="page-header__actions">
      <button class="top-button top-button--light" :disabled="!canGoBack" @click="$emit('back')">
        Back
      </button>
      <button class="top-button top-button--dark" :disabled="!canGoNext" @click="$emit('next')">
        Next
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
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 35%),
    linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
    var(--color-praymeri-bg);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

.page-header__label {
  display: inline-flex;
  align-items: center;
  margin: 0 0 10px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(57, 163, 230, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.18);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #9ec5ff;
}

.page-header__title {
  margin: 0;
font-size: clamp(22px, 3vw, 34px);  line-height: 1.12;
  font-weight: 600;
  color: #ffffff;
  max-width: 720px;
}

.page-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.top-button {
  min-width: 130px;
  min-height: 54px;
  padding: 14px 22px;
  border-radius: 16px;
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.22s ease;
}

.top-button--light {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.88);
}

.top-button--light:hover:not(:disabled) {
  background: rgba(255,255,255,0.07);
  border-color: rgba(59, 130, 246, 0.25);
  transform: translateY(-2px);
}

.top-button--dark {
  background: linear-gradient(135deg, var(--color-praymeri-blue), var(--color-praymeri-blueHover));
  color: #fff;
  box-shadow: 0 10px 24px rgba(59, 130, 246, 0.24);
}

.top-button--dark:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(59, 130, 246, 0.3);
}

.top-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 900px) {
  .page-header {
    padding: 24px;
    flex-direction: column;
    align-items: stretch;
  }

  .page-header__actions {
    width: 100%;
  }

  .top-button {
    flex: 1;
  }
}

@media (max-width: 560px) {
  .page-header {
    padding: 20px;
    border-radius: 22px;
  }

  .page-header__title {
    font-size: 28px;
  }

  .page-header__actions {
    flex-direction: column;
  }

  .top-button {
    width: 100%;
  }
}
</style>