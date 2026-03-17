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
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid rgba(34, 197, 94, 0.22);
  background: rgba(34, 197, 94, 0.08);
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.6;
  font-size: 15px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
}

.field-group {
  display: grid;
  gap: 8px;
}

.field-group__label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.84);
}

.field-group__control {
  width: 100%;
  min-height: 58px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  padding: 14px 16px;
  outline: none;
  font-size: 16px;
  color: #fff;
  transition: all 0.22s ease;
  backdrop-filter: blur(10px);
}

.field-group__control::placeholder {
  color: rgba(255,255,255,0.35);
}

.field-group__control:focus {
  border-color: rgba(59, 130, 246, 0.55);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  background: rgba(255,255,255,0.06);
}

.field-group__control--textarea {
  min-height: 130px;
  resize: vertical;
  padding-top: 16px;
  font-family: inherit;
}

.step-card__button {
  width: 100%;
  min-height: 58px;
  margin-top: 6px;
  border: none;
  border-radius: 18px;
  padding: 14px 20px;
  background: linear-gradient(135deg, var(--color-praymeri-blue), var(--color-praymeri-blueHover));
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.25);
}

.step-card__button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 16px 35px rgba(59, 130, 246, 0.32);
}

.step-card__button:active:not(:disabled) {
  transform: translateY(0);
}

.step-card__button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

@media (max-width: 720px) {
  .contact-form {
    gap: 16px;
  }

  .contact-form__note {
    padding: 14px 16px;
    font-size: 14px;
    border-radius: 16px;
  }

  .field-group__control {
    min-height: 54px;
    border-radius: 16px;
    font-size: 15px;
  }

  .field-group__control--textarea {
    min-height: 110px;
  }

  .step-card__button {
    min-height: 54px;
    border-radius: 16px;
  }
}
</style>
