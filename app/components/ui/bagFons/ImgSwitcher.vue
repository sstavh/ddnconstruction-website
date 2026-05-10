<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { fetchSection, imgUrl } from '~/composables/useApi'

const slides = ref([])
const defaultSlides = [
  { imageUrl: '/images/hero/hero1.jpg' },
  { imageUrl: '/images/hero/hero2.jpg' },
  { imageUrl: '/images/hero/hero3.jpg' },
]

// [cloneLast, ...real, cloneFirst]
const extended = ref([])

const index = ref(1) // стартуємо з першого реального
const transitioning = ref(true)
let timer = null

// Завантажувати background тільки для current ± 1
const shouldLoadBg = computed(() => (i) => {
  const total = extended.value.length
  if (total === 0) return false
  const diff = Math.abs(i - index.value)
  return diff <= 1 || diff >= total - 1
})

// РУХ ЗЛІВА -> ВПРАВО: зменшуємо індекс (translateX стає "менш мінус" => їде вправо)
const prev = () => {
  index.value -= 1
}

const onTransitionEnd = async () => {
  const slidesLen = slides.value.length
  if (slidesLen === 0) return
  
  // якщо доїхали до cloneLast (зліва)
  if (index.value === 0) {
    transitioning.value = false
    index.value = slidesLen // останній реальний
    await nextTick()
    // force reflow щоб браузер точно застосував transition: none
    void document.body.offsetHeight
    transitioning.value = true
  }

  // (на всякий випадок) якщо колись підеш в іншу сторону і дійдеш до cloneFirst
  if (index.value === extended.value.length - 1) {
    transitioning.value = false
    index.value = 1
    await nextTick()
    void document.body.offsetHeight
    transitioning.value = true
  }
}

async function fetchImages() {
  try {
    const data = await fetchSection('hero')
    if (data && data.length > 0) {
      slides.value = data.map((item) => ({
        ...item,
        imageUrl: imgUrl(item.imageUrl),
      }))
    } else {
      slides.value = defaultSlides
    }
  } catch (error) {
    console.error('Error fetching hero images:', error)
    slides.value = defaultSlides
  }
  
  // Побудова extended масиву з клонами
  if (slides.value.length > 0) {
    extended.value = [slides.value[slides.value.length - 1], ...slides.value, slides.value[0]]
  } else {
    extended.value = [...defaultSlides]
  }
}

onMounted(async () => {
  await fetchImages()
  timer = setInterval(prev, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="slider">
    <div
      class="track"
      :class="{ noTransition: !transitioning }"
      :style="{ transform: `translateX(-${index * 100}%)` }"
      @transitionend="onTransitionEnd"
    >
      <div
        v-for="(s, i) in extended"
        :key="i"
        class="slide"
        :style="{ backgroundImage: shouldLoadBg(i) ? `url(${s.imageUrl})` : 'none' }"
      />
    </div>
  </div>
</template>

<style scoped>
.slider {
  margin-top: -95px;
z-index: -50;
  width: 100%;
  height: 830px;
  overflow: hidden;
  position: absolute;
}

.track {
  display: flex;
  height: 100%;
  transition: transform 700ms ease-in-out;
  will-change: transform;
}

.track.noTransition {
  transition: none;
}

.slide {
  flex: 0 0 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* затемнення */
  filter: brightness(0.6);
}

 @media (max-width: 430px) {
  .slider{
    height: 600px;
  }
 }
</style>
