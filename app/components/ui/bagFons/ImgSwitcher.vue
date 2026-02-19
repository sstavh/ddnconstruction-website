<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const slides = [
  { color: '#1E3A8A' }, // синій
  { color: '#065F46' }, // зелений
  { color: '#7C2D12' }, // бордовий
]

// [cloneLast, ...real, cloneFirst]
const extended = [slides[slides.length - 1], ...slides, slides[0]]

const index = ref(1) // стартуємо з першого реального
const transitioning = ref(true)
let timer = null

// РУХ ЗЛІВА -> ВПРАВО: зменшуємо індекс (translateX стає "менш мінус" => їде вправо)
const prev = () => {
  index.value -= 1
}

const onTransitionEnd = async () => {
  // якщо доїхали до cloneLast (зліва)
  if (index.value === 0) {
    transitioning.value = false
    index.value = slides.length // останній реальний
    await nextTick()
    // force reflow щоб браузер точно застосував transition: none
    void document.body.offsetHeight
    transitioning.value = true
  }

  // (на всякий випадок) якщо колись підеш в іншу сторону і дійдеш до cloneFirst
  if (index.value === extended.length - 1) {
    transitioning.value = false
    index.value = 1
    await nextTick()
    void document.body.offsetHeight
    transitioning.value = true
  }
}

onMounted(() => {
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
        :style="{ backgroundColor: s.color }"
      />
    </div>
  </div>
</template>

<style scoped>
.slider {
z-index: -50;
  width: 100%;
  height: 730px;
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

  /* затемнення */
  filter: brightness(0.6);
}
</style>
