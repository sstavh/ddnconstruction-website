<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ReviewsFormaTest from '../components/ui/ReviewsFormaTest.vue';
import BaseModalTest from '../components/ui/BaseModalTest.vue';

type Review = {
  id: number;
  firstName?: string;
  lastName?: string;
  rating: number;
  message: string;
  photo?: string;
  createdAt?: string;
};

const apiUrl = useRuntimeConfig().public.apiUrl;

const reviews = ref<Review[]>([]);
const loading = ref(false);
const deletingId = ref<number | null>(null);

const open = ref(false);
const origin = ref<{ x: number; y: number } | null>(null);

const loadReviews = async () => {
  try {
    loading.value = true;

    const res = await fetch(`${apiUrl}/reviews`);
    if (!res.ok) {
      throw new Error(`Failed to load reviews: ${res.status}`);
    }

    const data = await res.json();
    reviews.value = data;
  } catch (error) {
    console.error('Failed to load reviews', error);
  } finally {
    loading.value = false;
  }
};

const openModal = (e?: MouseEvent) => {
  if (e) {
    origin.value = { x: e.clientX, y: e.clientY };
  } else {
    origin.value = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  open.value = true;
};

const closeModal = () => {
  open.value = false;
};

const refreshReviews = async () => {
  await loadReviews();
  closeModal();
};

const deleteReview = async (id: number) => {
  const confirmed = window.confirm('Видалити цей відгук?');
  if (!confirmed) return;

  try {
    deletingId.value = id;

    const res = await fetch(`${apiUrl}/reviews/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Failed to delete review: ${res.status}`);
    }

    reviews.value = reviews.value.filter((review) => review.id !== id);
  } catch (error) {
    console.error('Failed to delete review', error);
    alert('Не вдалося видалити відгук');
  } finally {
    deletingId.value = null;
  }
};

onMounted(loadReviews);
</script>

<template>
  <section class="reviews-admin">
    <div class="container">
      <div class="admin-header">
        <h1>Керування відгуками</h1>

        <div class="admin-actions">
          <button class="refresh-btn" @click="loadReviews">Оновити</button>
          <button class="add-btn" @click="openModal">Додати відгук</button>
        </div>
      </div>

      <BaseModalTest :open="open" :origin="origin" @close="closeModal">
        <ReviewsFormaTest @submitted="refreshReviews" />
      </BaseModalTest>

      <div v-if="loading" class="loading">
        Завантаження...
      </div>

      <div v-else class="table-wrap">
        <table class="reviews-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ім’я</th>
              <th>Оцінка</th>
              <th>Текст</th>
              <th>Фото</th>
              <th>Дата</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="reviews.length === 0">
              <td colspan="7" class="empty-cell">Відгуків поки немає</td>
            </tr>

            <tr v-for="review in reviews" :key="review.id">
              <td>{{ review.id }}</td>

              <td>
                {{ `${review.firstName ?? ''} ${review.lastName ?? ''}`.trim() || '—' }}
              </td>

              <td>{{ review.rating }}</td>

              <td class="message-cell">
                {{ review.message }}
              </td>

              <td>
                <img
                  v-if="review.photo"
                  :src="`${apiUrl}/${review.photo}`"
                  alt="review photo"
                  class="thumb"
                />
                <span v-else>—</span>
              </td>

              <td>
                {{ review.createdAt ? new Date(review.createdAt).toLocaleString() : '—' }}
              </td>

              <td>
                <button
                  class="delete-btn"
                  :disabled="deletingId === review.id"
                  @click="deleteReview(review.id)"
                >
                  {{ deletingId === review.id ? 'Видалення...' : 'Видалити' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-admin {
  padding: 40px 0;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.admin-actions {
  display: flex;
  gap: 12px;
}

.loading {
  padding: 24px 0;
  text-align: center;
}

.table-wrap {
  overflow-x: auto;
}

.reviews-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.reviews-table th,
.reviews-table td {
  border: 1px solid #d1d5db;
  padding: 12px;
  text-align: left;
  vertical-align: top;
}

.reviews-table th {
  background: #f3f4f6;
}

.message-cell {
  min-width: 260px;
  max-width: 420px;
  white-space: pre-wrap;
  word-break: break-word;
}

.empty-cell {
  text-align: center;
  padding: 24px;
}

.thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
}

.add-btn,
.refresh-btn,
.delete-btn {
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
}

.add-btn {
  background: #16a34a;
  color: white;
}

.refresh-btn {
  background: #2563eb;
  color: white;
}

.delete-btn {
  background: #dc2626;
  color: white;
}

.delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-actions {
    justify-content: stretch;
    flex-wrap: wrap;
  }
}
</style>