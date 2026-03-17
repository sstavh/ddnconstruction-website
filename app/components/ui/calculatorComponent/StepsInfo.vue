<template>
  <section class="steps-info">
    <div class="steps-info__row">
      <div v-for="(step, index) in steps" :key="step.id" class="steps-info__item">
        <span
          class="steps-info__dot"
          :class="{
            'steps-info__dot--active': index === currentStep,
            'steps-info__dot--done': step.completed,
          }"
        />
        <p class="steps-info__text">{{ step.shortText }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CalculatorStep } from '../../../types/calculator'

defineProps<{
  steps: CalculatorStep[]
  currentStep: number
}>()
</script>

<style scoped>
.steps-info {
  position: relative;
  overflow: hidden;
  padding: 22px;
  border-radius: 24px;
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 35%),
    linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
    var(--color-praymeri-bg);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

.steps-info::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.035) 0%,
    transparent 45%,
    rgba(59,130,246,0.04) 100%
  );
}

.steps-info__row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.steps-info__item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 68px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.22s ease;
}

.steps-info__item:hover {
  background: rgba(255,255,255,0.05);
  border-color: rgba(59, 130, 246, 0.18);
}

.steps-info__dot {
  position: relative;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255,255,255,0.16);
  border: 1px solid rgba(255,255,255,0.12);
  transition: all 0.25s ease;
}

.steps-info__dot--active {
  background: var(--color-praymeri-blue);
  border-color: var(--color-praymeri-blue);
  box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.14);
}

.steps-info__dot--done {
  background: #22c55e;
  border-color: #22c55e;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.14);
}

.steps-info__dot--done::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  transform: translate(-50%, -55%);
}

.steps-info__text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.45;
  color: rgba(255,255,255,0.78);
  text-align: left;
}

@media (max-width: 900px) {
  .steps-info__row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .steps-info {
    padding: 18px;
    border-radius: 20px;
  }

  .steps-info__item {
    min-height: 60px;
    padding: 12px 14px;
    border-radius: 16px;
  }

  .steps-info__text {
    font-size: 13px;
  }
}
</style>