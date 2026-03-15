<script setup lang="ts">
import { ref, computed } from 'vue'
import { pricingData } from '../data/pricing'

const activeCategoryId = ref<string>(pricingData[0].id)

const setActiveCategory = (id: string) => {
  activeCategoryId.value = id
}

const activeCategory = computed(() =>
  pricingData.find(category => category.id === activeCategoryId.value)
)
</script>

<template>
  <section class="pricing-section">
    <div class="container">
      <div
        class="pricing-header"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <p class="pricing-subtitle">Pricing Plans</p>
        <h2 class="pricing-title">Choose a Service Category</h2>
        <p class="pricing-text">
          Натисни на категорію, щоб побачити перелік робіт і ціну за квадратний фут
        </p>
      </div>

      <div
        class="pricing-cards"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <button
          v-for="category in pricingData"
          :key="category.id"
          type="button"
          class="pricing-card"
          :class="{ active: activeCategoryId === category.id }"
          @click="setActiveCategory(category.id)"
        >
          <h3 class="pricing-card-title">{{ category.title }}</h3>
          <p class="pricing-card-uk">{{ category.titleUk }}</p>
          <p class="pricing-card-desc">{{ category.description }}</p>
        </button>
      </div>

      <div
        class="pricing-details"
        data-aos="fade-up"
        data-aos-delay="250"
      >
        <div v-if="activeCategory" class="pricing-panel">
          <div class="pricing-details-head">
            <h3>{{ activeCategory.title }}</h3>
            <p>{{ activeCategory.titleUk }}</p>
          </div>

          <div class="pricing-list">
            <div
              v-for="(item, itemIndex) in activeCategory.items"
              :key="`${activeCategory.id}-${itemIndex}`"
              class="pricing-item"
            >
              <div class="pricing-item-info">
                <h4>{{ item.title }}</h4>
                <p>{{ item.titleUk }}</p>
              </div>

              <div class="pricing-item-price">
                {{ item.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  padding: 100px 0;
  background: #0f172a;
  color: #ffffff;
}

.container {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.pricing-header {
  max-width: 760px;
  margin: 0 auto 50px;
  text-align: center;
}

.pricing-subtitle {
  margin: 0 0 12px;
  color: #facc15;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.pricing-title {
  margin: 0 0 14px;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.1;
  font-weight: 700;
}

.pricing-text {
  margin: 0;
  color: #cbd5e1;
  font-size: 17px;
  line-height: 1.6;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}

.pricing-card {
  display: block;
  width: 100%;
  padding: 28px 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  transition:
    transform 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-6px);
  border-color: rgba(250, 204, 21, 0.45);
  background: rgba(255, 255, 255, 0.08);
}

.pricing-card:focus-visible {
  border-color: #facc15;
  box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.2);
}

.pricing-card.active {
  background: #facc15;
  color: #111827;
  border-color: #facc15;
  box-shadow: 0 16px 40px rgba(250, 204, 21, 0.2);
}

.pricing-card-title {
  margin: 0 0 10px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
}

.pricing-card-uk {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
}

.pricing-card-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
}

.pricing-details {
  padding: 32px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  min-height: 320px;
}

.pricing-panel {
  display: block;
}

.pricing-details-head {
  margin-bottom: 24px;
}

.pricing-details-head h3 {
  margin: 0 0 8px;
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
}

.pricing-details-head p {
  margin: 0;
  color: #facc15;
  font-size: 18px;
  font-weight: 600;
}

.pricing-list {
  display: grid;
  gap: 14px;
}

.pricing-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.pricing-item-info h4 {
  margin: 0 0 6px;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 600;
}

.pricing-item-info p {
  margin: 0;
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.5;
}

.pricing-item-price {
  flex-shrink: 0;
  white-space: nowrap;
  color: #facc15;
  font-size: 22px;
  font-weight: 700;
}

@media (max-width: 1100px) {
  .pricing-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .pricing-section {
    padding: 80px 0;
  }

  .pricing-cards {
    grid-template-columns: 1fr;
  }

  .pricing-details {
    padding: 22px;
    min-height: auto;
  }

  .pricing-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .pricing-item-price {
    font-size: 20px;
  }

  .pricing-details-head h3 {
    font-size: 26px;
  }
}
</style>
