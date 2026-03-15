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
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(229, 221, 208, 0.9);
  border-radius: 28px;
  padding: 20px;
}

.steps-info__row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.steps-info__item {
  text-align: center;
}

.steps-info__dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d7cabc;
  margin-bottom: 10px;
}

.steps-info__dot--active {
  background: #1d1d1d;
}

.steps-info__dot--done {
  background: var(--accent-2);
}

.steps-info__text {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--muted);
}

@media (max-width: 720px) {
  .steps-info {
    padding: 20px;
  }

  .steps-info__row {
    grid-template-columns: 1fr;
  }
}
</style>
