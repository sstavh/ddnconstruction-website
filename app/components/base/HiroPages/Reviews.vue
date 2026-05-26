<script lang="ts" setup>
import { ref, computed } from "vue";

import ReviewsCompTest from "~/components/ui/ReviewsCompTest.vue";
import ReviewsButtonTest from "~/components/ui/ReviewsButtonTest.vue";
import ReviewsFormaTest from "~/components/ui/ReviewsFormaTest.vue";
import BaseModalTest from "~/components/ui/BaseModalTest.vue";
import { imgUrl, thumbUrl, getApiBase } from "~/composables/useApi";

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  avatarColor: string;
  workPhoto?: string;
  workFallbackColor: string;
};

const open = ref(false);
const origin = ref<{ x: number; y: number } | null>(null);

const {
  data: reviewsData,
  pending: loading,
  refresh: refreshReviewsFetch,
  error: loadError,
} = useFetch(() => `${getApiBase()}/reviews`, {
  server: false,
  transform: (data: any) =>
    [...data]
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map((item: any) => ({
        id: item.id,
        name: `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim(),
        rating: Number(item.rating) || 0,
        text: item.message ?? "",
        photo: item.photo ? thumbUrl(imgUrl(item.photo), 300) : '',
        avatarColor: "#3b82f6",
        workFallbackColor: "#374151",
      })),
});

const reviews = computed<Review[]>(() => (reviewsData.value ?? []) as Review[]);

const openFromClick = (e: MouseEvent) => {
  origin.value = { x: e.clientX, y: e.clientY };
  open.value = true;
};

const refreshReviews = async () => {
  await refreshReviewsFetch();
  open.value = false;
};
</script>

<template>
  <section>
    <div class="container">
      <div class="reviews-container__box">
        <div class="reviews-box">
          <h3 class="reviews-box__title">Customer Reviews</h3>

          <div class="reviews-box__subtitle">
            <div class="box__subtitle">
              <p class="reviews-box__text">Leave your review about our work</p>

              <ReviewsButtonTest @click="openFromClick" />

              <BaseModalTest
                :open="open"
                :origin="origin"
                @close="open = false"
              >
                <ReviewsFormaTest @submitted="refreshReviews" />
              </BaseModalTest>
            </div>

            <div class="reviews-status">
              <p v-if="loading">Loading reviews...</p>
              <p v-else-if="loadError">Failed to load reviews.</p>
              <p v-else>Reviews: {{ reviews.length }}</p>
            </div>

            <ReviewsCompTest
              :reviews="reviews"
              :visible-count="3"
              :interval-ms="30000"
              :transition-ms="450"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-container__box {
  margin-top: 160px;
  margin-bottom: 80px;
}

.reviews-box__title {
  text-align: center;
  margin-top: 160px;
}

.box__subtitle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.reviews-box__subtitle {
  text-align: center;
}

.reviews-box__text {
  font-size: var(--font-s-button);
  margin-left: 28%;
}

.reviews-status {
  font-size: 20px;
  color: #fff;
  margin-bottom: 20px;
}

@media (max-width: 430px) {
  .reviews-box__text {
    margin-top: 25px;
    margin-bottom: 25px;
    margin-left: 0;
  }

  .box__subtitle {
    display: block;
  }

  .reviews-status {
    font-size: 18px;
  }
}
</style>
