<template>
  <div class="fields-box">
    <div
      v-for="field in fields"
      :key="field.key"
      class="field-group"
    >
      <label class="field-group__label">{{ field.label }}</label>

      <select
        v-if="field.type === 'select'"
        class="field-group__control"
        @change="onChange(field.key, ($event.target as HTMLSelectElement).value)"
      >
        <option value="">{{ field.placeholder }}</option>
        <option v-for="option in field.options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <input
        v-else-if="field.type === 'number'"
        class="field-group__control"
        type="number"
        :placeholder="field.placeholder"
        @input="onChange(field.key, ($event.target as HTMLInputElement).value)"
      >

      <div v-else-if="field.type === 'radio'" class="radio-grid">
        <button
          v-for="option in field.options"
          :key="option"
          type="button"
          class="radio-grid__item"
          @click="onChange(field.key, option)"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepField } from '../../../types/calculator'

defineProps<{
  fields: StepField[]
}>()

const emit = defineEmits<{
  (e: 'update', payload: Record<string, string | number>): void
}>()

function onChange(key: string, value: string) {
  emit('update', { [key]: value })
}
</script>