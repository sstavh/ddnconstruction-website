<template>
  <section class="wrap" :style="wrapStyle">
    <!-- поточний фон -->
    <div
      class="layer base"
      :style="currentItem.imageUrl
        ? { backgroundImage: `url(${currentItem.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : { background: currentItem.color || '#333' }"
    ></div>

    <!-- новий фон (wipe зліва направо) -->
    <div
      v-if="isAnimating"
      class="layer wipe"
      :key="wipeKey"
      :style="nextItem.imageUrl
        ? { backgroundImage: `url(${nextItem.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : { background: nextItem.color || '#333' }"
      @animationend="onWipeEnd"
    ></div>

    <!-- контент -->
    <div class="content">
      <h4 class="title">{{ displayItem.title }}</h4>
      <p class="text">{{ displayItem.text }}</p>
    </div>

    <!-- dots навігація -->
    <div class="dots">
      <span
        v-for="(_, i) in allSlides"
        :key="i"
        class="dot"
        :class="{ active: i === index }"
        @click="goTo(i)"
      ></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type SlideItem = {
  color?: string
  imageUrl?: string
  title: string
  text: string
}

type Props = {
  slides?: SlideItem[]
  section?: string
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
const dbSlides = ref<SlideItem[]>([])

const allSlides = computed(() => {
  if (props.section && dbSlides.value.length > 0) return dbSlides.value
  return props.slides || []
})

const currentItem = computed(() => allSlides.value[index.value] || { title: '', text: '' })
const nextItem = computed(() =>
  allSlides.value[(index.value + 1) % allSlides.value.length] || { title: '', text: '' }
)
const displayItem = computed(() =>
  isAnimating.value ? nextItem.value : currentItem.value
)

const wrapStyle = computed(() => ({
  '--h': props.height,
  '--r': props.radius,
  '--wipe': `${props.wipeMs}ms`,
}))

function startWipe() {
  if (isAnimating.value || allSlides.value.length < 2) return
  isAnimating.value = true
  wipeKey.value++
}

function goTo(i: number) {
  if (isAnimating.value || i === index.value) return
  index.value = i
}

function onWipeEnd() {
  index.value = (index.value + 1) % allSlides.value.length
  isAnimating.value = false
}

async function fetchFromDb() {
  if (!props.section) return
  try {
    const res = await fetch(`http://localhost:3001/section-images/section/${props.section}`)
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      dbSlides.value = data.map((item: any) => ({
        imageUrl: item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:3001/${item.imageUrl}`,
        title: item.title || '',
        text: item.description || '',
      }))
    }
  } catch (e) {
    console.error('caruseProgektTest fetch error:', e)
  }
}

let timer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await fetchFromDb()
  timer = setInterval(startWipe, props.intervalMs)
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

/* dots */
.dots {
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 2;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.25s, transform 0.25s;
}

.dot.active {
  background: white;
  transform: scale(1.3);
}

@media (prefers-reduced-motion: reduce) {
  .wipe { animation: none; transform: translateX(0); }
}
</style>