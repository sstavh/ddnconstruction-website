<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="field-group">
      <label class="field-group__label">Ім’я</label>
      <input v-model="form.name" class="field-group__control" type="text" placeholder="Ваше ім’я">
    </div>

    <div class="field-group">
      <label class="field-group__label">Телефон</label>
      <input v-model="form.phone" class="field-group__control" type="text" placeholder="Ваш телефон">
    </div>

    <div class="field-group">
      <label class="field-group__label">Коментар</label>
      <textarea v-model="form.comment" class="field-group__control field-group__control--textarea" placeholder="Ваш коментар"></textarea>
    </div>

    <button class="step-card__button" type="submit">
      Надіслати форму
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { ContactForm } from '../../../types/calculator'

const emit = defineEmits<{
  (e: 'submit-form', payload: ContactForm): void
}>()

const form = reactive<ContactForm>({
  name: '',
  phone: '',
  comment: '',
})

function submit() {
  emit('submit-form', { ...form })
}
</script>