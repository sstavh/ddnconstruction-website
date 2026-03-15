<template>
  <div class="step-progress" :style="{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }">
    <div
      v-for="(step, index) in steps"
      :key="step.id"
      class="step-progress__item"
      :class="{
        'step-progress__item--active': index === currentStep,
        'step-progress__item--done': step.completed,
      }"
    >
      <span class="step-progress__number">{{ step.id }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalculatorStep } from '../../../types/calculator'

defineProps<{
  steps: CalculatorStep[]
  currentStep: number
}>()
</script>

<style scoped>
.step-progress {
  display: grid;
  gap: 10px;
}

.step-progress__item {
  height: 8px;
  border-radius: 999px;
  background: rgba(29, 29, 29, 0.12);
  overflow: hidden;
}

.step-progress__item--active,
.step-progress__item--done {
  background: var(--accent-2);
}

.step-progress__number {
  display: none;
}
</style>
