<template>
  <div class="step-progress">
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