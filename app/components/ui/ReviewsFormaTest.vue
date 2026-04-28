<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "submitted"): void;
}>();

const apiUrl = useRuntimeConfig().public.apiUrl || "http://127.0.0.1:3001";
const fileInput = ref<HTMLInputElement | null>(null);

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const rating = ref(0);
const message = ref("");
const photo = ref<File | null>(null);
const error = ref("");
const success = ref("");
const isSubmitting = ref(false);

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
    error.value = "Please fill in all required fields.";
    success.value = "";
    return;
  }

  error.value = "";
  success.value = "";
  isSubmitting.value = true;

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
      throw new Error("Failed to submit form");
    }

    success.value = "Review submitted successfully.";

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
    error.value = "Failed to submit review. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form class="review-form" @submit.prevent="submitForm">
    <h3 class="review-form__title">Submit a Review</h3>

    <p class="review-form__subtitle">
      We appreciate your feedback — it helps us improve
    </p>

    <div class="row">
      <input v-model="firstName" type="text" placeholder="First Name" required />
      <input v-model="lastName" type="text" placeholder="Last Name" required />
    </div>

    <input v-model="email" type="email" placeholder="Email" required />

    <div class="stars" aria-label="Rating">
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

    <textarea
      v-model="message"
      placeholder="Your review..."
      rows="4"
      required
    ></textarea>

    <input
      ref="fileInput"
      class="file-input"
      type="file"
      accept="image/*"
      @change="handleFile"
      required
    />

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? "Submitting..." : "Submit Review" }}
    </button>
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

textarea {
  resize: vertical;
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

.file-input {
  color: transparent;
  padding: 10px;
  background: rgba(255,255,255,0.04);
}

.file-input::file-selector-button {
  margin-right: 12px;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  background: #fff;
  color: #000;
  cursor: pointer;
}

.file-input::after {
  content: "No file selected";
  color: #fff;
}

.file-input:valid::after {
  content: "File selected";
}

.error {
  color: #ef4444;
  font-size: 13px;
}

.success {
  color: #22c55e;
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

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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