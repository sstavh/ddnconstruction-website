<template>
  <section class="step-card">
    <p class="step-card__label">Етап {{ step.id }}</p>
    <h2 class="step-card__title">{{ step.title }}</h2>
    <p class="step-card__subtitle">{{ step.subtitle }}</p>
    <p class="step-card__description">{{ step.description }}</p>

    <CalculatorFields
      v-if="!isLastStep"
      :fields="step.fields"
      @update="updateDraft"
    />

    <ContactForm
      v-else
      @submit-form="handleSubmitForm"
    />

    <button
      v-if="!isLastStep"
      class="step-card__button"
      @click="handleComplete"
    >
      {{ step.buttonText }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CalculatorFields from './CalculatorFields.vue'
import ContactForm from './ContactForm.vue'
import type { CalculatorStep, ContactForm as ContactFormType } from '../../../types/calculator'

const props = defineProps<{
  step: CalculatorStep
  isLastStep: boolean
}>()

const emit = defineEmits<{
  (e: 'complete-step', payload?: Record<string, string | number>): void
  (e: 'submit-form', payload: ContactFormType): void
}>()

const draft = reactive<Record<string, string | number>>({})

function updateDraft(payload: Record<string, string | number>) {
  Object.assign(draft, payload)
}

function handleComplete() {
  emit('complete-step', { ...draft })
}

function handleSubmitForm(payload: ContactFormType) {
  emit('submit-form', payload)
}
</script>