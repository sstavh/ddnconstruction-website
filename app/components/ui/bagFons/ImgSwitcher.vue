<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { fetchSection, imgUrl } from '~/composables/useApi'

const slides = ref([])
const extended = ref([])
const index = ref(1)
const transitioning = ref(true)
let timer = null

// Рендеримо <img> тільки для current ± 1 щоб не грузити всі одразу
const shouldRender = computed(() => (i) => {
  const total = extended.value.length
  if (total === 0) return false
  const diff = Math.abs(i - index.value)
  return diff <= 1 || diff >= total - 1
})

const prev = () => {
  if (extended.value.length > 0) index.value -= 1
}

const onTransitionEnd = async () => {
  const slidesLen = slides.value.length
  if (slidesLen === 0) return

  if (index.value === 0) {
    transitioning.value = false
    index.value = slidesLen
    await nextTick()
    void document.body.offsetHeight
    transitioning.value = true
  }

  if (index.value === extended.value.length - 1) {
    transitioning.value = false
    index.value = 1
    await nextTick()
    void document.body.offsetHeight
    transitioning.value = true
  }
}

function buildExtended(arr) {
  return [arr[arr.length - 1], ...arr, arr[0]]
}

async function fetchImages() {
  try {
    const data = await fetchSection('hero')
    if (data && data.length > 0) {
      slides.value = data.map((item) => ({
        ...item,
        imageUrl: imgUrl(item.imageUrl),
      }))
      extended.value = buildExtended(slides.value)
      index.value = 1
    }
  } catch (error) {
    console.error('Error fetching hero images:', error)
  }
}

onMounted(() => {
  // Таймер стартує одразу — не чекаємо API
  timer = setInterval(prev, 3000)
  // Фото підтягуються у фоні
  fetchImages()
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
      >
        <img
          v-if="s.imageUrl && shouldRender(i)"
          :src="s.imageUrl"
          :fetchpriority="i === 1 ? 'high' : 'auto'"
          loading="eager"
          decoding="async"
          class="slide-img"
          alt=""
        />
      </div>
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
  background: #0f172a;
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
  position: relative;
  overflow: hidden;
}

.slide-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.6);
}

@media (max-width: 430px) {
  .slider {
    height: 600px;
  }
}
</style>
