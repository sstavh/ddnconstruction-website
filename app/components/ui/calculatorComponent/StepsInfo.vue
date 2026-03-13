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