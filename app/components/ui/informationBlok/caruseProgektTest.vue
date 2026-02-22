<template>
  <section class="wrap" :style="wrapStyle">
    <!-- поточний фон -->
    <div class="layer base" :style="{ background: currentItem.color }"></div>

    <!-- новий фон (wipe зліва направо) -->
    <div
      v-if="isAnimating"
      class="layer wipe"
      :key="wipeKey"
      :style="{ background: nextItem.color }"
      @animationend="onWipeEnd"
    ></div>

    <!-- контент -->
    <div class="content">
      <h4 class="title">{{ displayItem.title }}</h4>
      <p class="text">{{ displayItem.text }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type SlideItem = {
  color: string
  title: string
  text: string
}

type Props = {
  slides: SlideItem[]
  intervalMs?: number
  wipeMs?: number
  height?: string
  radius?: string
}

const props = withDefaults(defineProps<Props>(), {
  intervalMs: 5000,
  wipeMs: 800,
  height: '240px',
  radius: '16px',
})

const index = ref(0)
const isAnimating = ref(false)
const wipeKey = ref(0)

let timer: ReturnType<typeof setInterval> | null = null

const currentItem = computed(() => props.slides[index.value])
const nextItem = computed(() =>
  props.slides[(index.value + 1) % props.slides.length]
)

// що показувати в центрі (під час анімації вже новий текст)
const displayItem = computed(() =>
  isAnimating.value ? nextItem.value : currentItem.value
)

const wrapStyle = computed(() => ({
  '--h': props.height,
  '--r': props.radius,
  '--wipe': `${props.wipeMs}ms`,
}))

function startWipe() {
  if (isAnimating.value) return
  isAnimating.value = true
  wipeKey.value++
}

function onWipeEnd() {
  index.value = (index.value + 1) % props.slides.length
  isAnimating.value = false
}

onMounted(() => {
  timer = setInterval(() => {
    startWipe()
  }, props.intervalMs)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.wrap {
    width: 400px;
  position: relative;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  place-items: center;
  isolation: isolate;
}

.layer {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.wipe {
  z-index: -1;
  transform: translateX(-100%);
  animation: wipeIn var(--wipe) ease forwards;
}

@keyframes wipeIn {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0%); }
}

.wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 0;
}

.content {

  border: 2px solid wheat;
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 120px;
  max-width: 700px;
  border-radius: 25px;
}

.title {
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 700;
}

.text {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .wipe { animation: none; transform: translateX(0); }
}
</style>