<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "submitted"): void;
}>();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const rating = ref(0);
const message = ref("");
const photo = ref<File | null>(null);
const error = ref("");

const setRating = (v: number) => (rating.value = v);

const handleFile = (e: Event) => {
  const input = e.target as HTMLInputElement;
  photo.value = input.files?.[0] ?? null;
};

const submitForm = () => {
  if (!firstName.value || !lastName.value || !email.value || !rating.value || !message.value || !photo.value) {
    error.value = "Заповніть всі поля (всі обов’язкові)";
    return;
  }

  error.value = "";

  // тут буде твій API-запит (якщо треба)
  console.log("Send review ✅", {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    rating: rating.value,
    message: message.value,
    photo: photo.value,
  });

  // ✅ повідомляємо батьківський компонент, що все ок
  emit("submitted");
};
</script>

<template>
  <form class="review-form" @submit.prevent="submitForm">
    <h3 class="review-form__title" >Надішліть відгук</h3>
    <p class="review-form__subtitle">Ми раді вашому відгуку — він допомагає нам ставати кращими</p>

    <div class="row">
      <input v-model="firstName" type="text" placeholder="Ім'я" required />
      <input v-model="lastName" type="text" placeholder="Прізвище" required />
    </div>

    <input v-model="email" type="email" placeholder="Email" required />

    <div class="stars" aria-label="Оцінка">
      <button
        v-for="star in 5"
        :key="star"
        class="star"
        type="button"
        :class="{ active: star <= rating }"
        @click="setRating(star)"
      >
        ★
      </button>
      <input class="sr" :value="rating" required aria-hidden="true" />
    </div>

    <textarea v-model="message" placeholder="Ваш відгук..." rows="4" required />

    <input type="file" accept="image/*" @change="handleFile" required />

    <p v-if="error" class="error">{{ error }}</p>

    <button type="submit">Відправити</button>
  </form>
</template>

<style scoped>
.review-form { display:flex; flex-direction:column; gap:12px; }
.row { display:flex; gap:10px; }
input, textarea { width:100%; padding:12px; border:1px solid #d1d5db; border-radius:10px; }
.stars { display:flex; gap:6px; align-items:center; }
.star { border:0; background:transparent; font-size:26px; cursor:pointer; color:#d1d5db; padding:0; }
.star.active { color:#fbbf24; }
.error { color:#ef4444; font-size:13px; margin:0; }
.sr { position:absolute; opacity:0; pointer-events:none; height:0; width:0; }
button[type="submit"] { padding:12px; border-radius:12px; border:none; background:#3b82f6; color:#fff; font-weight:600; cursor:pointer; }

.review-form__title{
  color: var(--color-praymeri-blek);
  margin-top: -45px;
    text-align: center;
}

.review-form__subtitle{
  color: var(--color-praymeri-blek);
    text-align: center;
    margin-bottom: 30px;
}
</style>