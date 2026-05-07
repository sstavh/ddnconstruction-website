<script lang="ts" setup>
import ImgCloud from './ImgCloud.vue'

interface Card {
  logo: string
  title: string
  description: string
  colors: string[]
  blockColor: string
  section?: string
}

const props = defineProps<{
  cards: Card[]
}>()
</script>

<template>
  <section>
    <div class="container">
      <div class="infoCard-container">

        <ImgCloud
          v-for="(card, index) in cards"
          :key="index"
          :logo="card.logo"
          :title="card.title"
          :description="card.description"
          :colors="card.colors"
          :blockColor="card.blockColor"
          :section="card.section"
        />

      </div>
    </div>
  </section>
</template>

<style scoped>
.infoCard-container {
    margin-top: 130px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.infoCard-container :deep(.smart-card) {
  flex: 0 0 calc(33.333% - 16px);
}

@media (max-width: 1024px) {
  .infoCard-container :deep(.smart-card) {
    flex: 0 0 calc(50% - 12px);
  }
}

@media (max-width: 768px) {
  .infoCard-container :deep(.smart-card) {
    flex: 0 0 100%;
  }
}
</style>
