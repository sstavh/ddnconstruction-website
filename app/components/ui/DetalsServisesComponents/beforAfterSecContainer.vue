<script setup lang="ts">
import beforeAfter from '../informationBlok/beforeAfter.vue'
import { ref, watch } from 'vue'

interface Item {
  leftColor: string
  rightColor: string
  leftSection?: string
  rightSection?: string
}

const props = defineProps<{
  title: string
  items: Item[]
}>()

const values = ref<number[]>([])
watch(() => props.items.length, (len) => {
  values.value = Array(len).fill(50)
}, { immediate: true })
</script>

<template>
  <div class="container">
    <div class="befAft-container">

      <h3  data-aos="fade-up" order: 2 class="befAft-container-title">
        {{ title }}
      </h3>

      <ul class="befAft-list">
        <li
          data-aos="fade-up" data-aos-delay="300"
          v-for="(item, index) in items"
          :key="index"
        >
          <beforeAfter
            class="tt"
            :model-value="values[index] ?? 50"
            @update:model-value="values[index] = $event"
            :leftColor="item.leftColor"
            :rightColor="item.rightColor"
            :left-section="item.leftSection"
            :right-section="item.rightSection"
          />
        </li>
      </ul>

    </div>
  </div>
</template>

<style scoped>
/* ====== BASE ====== */
.befAft-container{
    margin-bottom: 120px;
}

.befAft-container-title{
    text-align: center;
    margin-top: 120px;
    margin-bottom: 50px;
}

/* GRID замість flex (стабільніше) */
.befAft-list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.befAft-list li{
  list-style: none;
}

/* картка */
.tt{
    height: 250px;
    width: 100%;
}


/* ====== 1024px ====== */
@media (max-width: 1024px) {
  .befAft-list{
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .tt{
    height: 250px;
    width: 100%;
  }
}


/* ====== 768px ====== */
@media (max-width: 768px) {
  .befAft-list{
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .tt{
    height: 240px;
  }
}


/* ====== 430px ====== */
@media (max-width: 430px) {
  .befAft-list{
    grid-template-columns: 1fr; /* 🔥 всі підряд */
    gap: 20px;
  }

  .tt{
    width: 100%;
    height: 220px;
  }

  .befAft-container-title{
    margin-top: 80px;
    margin-bottom: 30px;
  }
}
</style>
