<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "submitted"): void;
}>();

const apiUrl = useRuntimeConfig().public.apiUrl;
const fileInput = ref<HTMLInputElement | null>(null);

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

const submitForm = async () => {
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !rating.value ||
    !message.value ||
    !photo.value
  ) {
    error.value = "Заповніть всі поля (всі обов’язкові)";
    return;
  }

  error.value = "";

  try {
    const formData = new FormData();
    formData.append("firstName", firstName.value);
    formData.append("lastName", lastName.value);
    formData.append("email", email.value);
    formData.append("rating", String(rating.value));
    formData.append("message", message.value);

    if (photo.value) {
      formData.append("photo", photo.value);
    }

    const response = await fetch(`${apiUrl}/reviews`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Помилка при відправці форми");
    }

    console.log("Відгук успішно відправлено ✅");

    // очистка форми
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    rating.value = 0;
    message.value = "";
    photo.value = null;
    if (fileInput.value) fileInput.value.value = "";

    emit("submitted");
  } catch (err) {
    console.error(err);
    error.value = "Не вдалося відправити відгук. Спробуйте ще раз.";
  }
};
</script>

<template>
  <form class="review-form" @submit.prevent="submitForm">
    <h3 class="review-form__title">Надішліть відгук</h3>
    <p class="review-form__subtitle">
      Ми раді вашому відгуку — він допомагає нам ставати кращими
    </p>

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

    <textarea v-model="message" placeholder="Ваш відгук..." rows="4" required></textarea>

    <input ref="fileInput" type="file" accept="image/*" @change="handleFile" required />

    <p v-if="error" class="error">{{ error }}</p>

    <button type="submit">Відправити</button>
  </form>
</template>

<style scoped>
.review-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: transparent;
  padding: 22px;
  color: #fff;
}

.review-form__title {
  color: #fff;
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  margin: 0;
}

.review-form__subtitle {
  color: rgba(255,255,255,0.7);
  text-align: center;
  font-size: 14px;
  margin: 0 0 10px;
}

.row {
  display: flex;
  gap: 10px;
}

input,
textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: #fff;
  outline: none;
  transition: 0.2s ease;
}

input::placeholder,
textarea::placeholder {
  color: rgba(255,255,255,0.5);
}

input:focus,
textarea:focus {
  border-color: rgba(59,130,246,0.6);
  background: rgba(255,255,255,0.08);
}

.stars {
  display: flex;
  gap: 6px;
  align-items: center;
}

.star {
  border: 0;
  background: transparent;
  font-size: 26px;
  cursor: pointer;
  color: rgba(255,255,255,0.25);
  transition: 0.2s;
}

.star.active {
  color: #fbbf24;
  transform: scale(1.05);
}

input[type="file"] {
  padding: 10px;
  background: rgba(255,255,255,0.04);
}

.error {
  color: #ef4444;
  font-size: 13px;
}

button[type="submit"] {
  padding: 12px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59,130,246,0.35);
}

@media (max-width: 430px) {
  .review-form {
    padding: 16px;
    border-radius: 16px;
  }

  .row {
    flex-direction: column;
  }

  .review-form__title {
    font-size: 18px;
  }
}
</style>