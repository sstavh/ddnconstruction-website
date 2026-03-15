<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="contact-form__note">
      У заявку автоматично підуть усі дані з вашого чеку.
    </div>

    <div class="field-group">
      <label class="field-group__label">Ім’я</label>
      <input
        v-model="form.name"
        class="field-group__control"
        type="text"
        placeholder="Ваше ім’я"
      >
    </div>

    <div class="field-group">
      <label class="field-group__label">Телефон</label>
      <input
        v-model="form.phone"
        class="field-group__control"
        type="text"
        placeholder="Ваш телефон"
      >
    </div>

    <div class="field-group">
      <label class="field-group__label">Коментар</label>
      <textarea
        v-model="form.comment"
        class="field-group__control field-group__control--textarea"
        placeholder="Ваш коментар"
      />
    </div>

    <button class="step-card__button" type="submit" :disabled="!canSubmit">
      Надіслати форму
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { ContactForm } from '../../../types/calculator'

const emit = defineEmits<{
  (e: 'submit-form', payload: ContactForm): void
}>()

const form = reactive<ContactForm>({
  name: '',
  phone: '',
  comment: '',
})

const canSubmit = computed(() => {
  return form.name.trim().length > 1 && form.phone.trim().length > 4
})

function submit() {
  if (!canSubmit.value) return
  emit('submit-form', { ...form })
}
</script>

<style scoped>
.contact-form {
  display: grid;
  gap: 18px;
}

.contact-form__note {
  padding: 14px 16px;
  border-radius: 18px;
  background: var(--success);
  border: 1px solid var(--success-border);
  color: #245138;
  line-height: 1.5;
}

.field-group {
  display: grid;
  gap: 8px;
}

.field-group__label {
  font-size: 14px;
  font-weight: 600;
}

.field-group__control {
  width: 100%;
  min-height: 56px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #fff;
  padding: 14px 16px;
  outline: none;
}

.field-group__control--textarea {
  min-height: 120px;
  resize: vertical;
}

.step-card__button {
  width: 100%;
  min-height: 58px;
  border: none;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  transition: 0.2s ease;
}

.step-card__button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
