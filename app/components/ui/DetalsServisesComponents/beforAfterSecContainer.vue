<script setup lang="ts">
import beforeAfter from '../informationBlok/beforeAfter.vue'
import { ref } from 'vue'

interface Item {
  leftColor: string
  rightColor: string
}

const props = defineProps<{
  title: string
  items: Item[]
}>()

const value = ref(50)
</script>

<template>
  <div class="container">
    <div class="befAft-container">

      <h3  data-aos="fade-up" order: 2 class="befAft-container-title">
        {{ title }}
      </h3>

      <ul class="befAft-list">
        <li     data-aos="fade-up" data-aos-delay="300"
          v-for="(item, index) in items"
          :key="index"
        >
          <beforeAfter
          class="tt"
            v-model="value"
            :leftColor="item.leftColor"
            :rightColor="item.rightColor"
          />
        </li>
      </ul>

    </div>
  </div>
</template>

<style scoped>

.befAft-container{
    margin-bottom: 120px;
}
.befAft-container-title{
    text-align: center;
    margin-top: 120px;
    margin-bottom: 50px;
}

.befAft-list{
  display:flex;
  gap: 15px;
  flex-wrap:wrap;
}

.befAft-list li{
  flex:0 0 calc(33.333% - 16px);
  list-style:none;
}

.tt{
    height: 250px;
   width: 370px;
}
</style>
