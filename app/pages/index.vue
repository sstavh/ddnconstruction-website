<script setup lang="ts">
import { computed } from 'vue'
import DirectorMes from '../components/base/HiroPages/DirectorMes.vue';
import Hero from '../components/base/HiroPages/Hero.vue';
import OurProcess from '../components/base/HiroPages/OurProcess.vue';
import PortofolioSec from "../components/base/HiroPages/PortofolioSec.vue";
import DetalsInformation from '../components/base/HiroPages/DetalsInformation.vue';
import Reviews from '../components/base/HiroPages/Reviews.vue';
import FormaHiroSection from '../components/base/HiroPages/FormaHiroSection.vue';
import QuickChatWidget from '../components/base/HiroPages/QuickChatWidget.vue';
import VideoSection from '../components/base/HiroPages/VideoSection.vue';

const apiUrl = useRuntimeConfig().public.apiUrl

const { data: dmFlag } = await useAsyncData(
  'directorMesVisible',
  () => $fetch<any[]>(`${apiUrl}/section-images/section/directorMesVisible`),
  { server: true, getCachedData: () => undefined },
)

const showDirectorMes = computed(() => {
  const d = dmFlag.value
  return !(Array.isArray(d) && d.length > 0 && d[0].title === '0')
})
</script>

<template>
    <section class="home">
      <QuickChatWidget/>
      <Hero />
      <OurProcess />
      <DirectorMes v-if="showDirectorMes" />
      <DetalsInformation />
        <VideoSection />
     <PortofolioSec />
       <FormaHiroSection />
   <Reviews />
      
     
    </section>
  </template>
  
  <style scoped>
  
  </style>
  