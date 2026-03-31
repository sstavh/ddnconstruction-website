<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type PricingItem = {
  title: string
  titleUk: string
  price: string
}

type PricingCategory = {
  id: string
  title: string
  description: string
  items: PricingItem[]
}

const pricingData = ref<PricingCategory[]>([])
const activeCategoryId = ref('')

const setActiveCategory = (id: string) => {
  activeCategoryId.value = id
}

const activeCategory = computed(() =>
  pricingData.value.find(category => category.id === activeCategoryId.value)
)

const loadPricing = async () => {
  try {
    const res = await fetch('http://localhost:3001/pricing')

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    pricingData.value = await res.json()

    if (pricingData.value.length && !activeCategoryId.value) {
      activeCategoryId.value = pricingData.value[0].id
    }
  } catch (error) {
    console.error('Помилка завантаження прайсу:', error)
  }
}

onMounted(loadPricing)
</script>

<template>
  <section class="pricing-section">
    <div class="container">
      <div
        class="pricing-header"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2 class="pricing-title">Choose a Service Category</h2>
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

        <div v-else class="pricing-panel">
          <p>Завантаження прайсу...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  margin-bottom: 80px;
}

.pricing-header {
  max-width: 760px;
  margin: 0 auto 50px;
  text-align: center;
}

.pricing-subtitle {
  margin: 0 0 12px;
  color: var(--color-praymeri-blue);
  font-size: var(--font-s-textSmoll);
  font-weight: var(--font-w-h1);
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.pricing-title {
  margin-top: 120px;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.1;
  font-weight: var(--font-w-h1);
}

.pricing-text {
  margin: 0;
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
  color: var(--color-praymeri-light);
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
  border-color: #3b83f65d;
  background: rgba(255, 255, 255, 0.08);
}

.pricing-card:focus-visible {
  border-color: var(--color-praymeri-blue);
  box-shadow: 0 0 0 3px #3b83f65d;
}

.pricing-card.active {
  background: var(--color-praymeri-blue);
  color: #111827;
  border-color: var(--color-praymeri-blue);
  box-shadow: 0 16px 40px #3b83f65d;
}

.pricing-card-title {
  margin: 0 0 10px;
  font-size: var(--font-s-Mobalh4);
  line-height: 1.3;
  font-weight: var(--font-w-h1);
}

.pricing-card-uk {
  margin: 0 0 10px;
  font-size: var(--font-s-navigation);
  font-weight: var(--font-w-h1);
}

.pricing-card-desc {
  margin: 0;
  font-size: var(--font-s-textSmoll);
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
  color: var(--color-praymeri-blue);
  font-size: var(--font-s-button);
  font-weight: var(--font-w-h1);
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
  font-size: var(--font-s-button);
  line-height: 1.3;
  font-weight: var(--font-w-h1);
}

.pricing-item-info p {
  margin: 0;
  color: #94a3b8;
  font-size: var(--font-s-textSmoll);
  line-height: 1.5;
}

.pricing-item-price {
  flex-shrink: 0;
  white-space: nowrap;
  color: var(--color-praymeri-blue);
  font-size: var(--font-s-Mobalh4);
  font-weight: var(--font-w-h1);
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

@media (max-width: 768px) {
  .container {
    max-width: none;
  }

  .pricing-title {
    margin-top: 0;
  }
}
</style>