<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { fetchSection, imgUrl } from '~/composables/useApi'

const props = withDefaults(defineProps<{
  text?: string
  colors?: string[]
  images?: string[]
  section?: string
  cycleSeconds?: number
  randomMinWaitSeconds?: number
  randomMaxWaitSeconds?: number
  randomShowSeconds?: number
}>(), {
  text: 'Quality in Every Detail',
  colors: () => ['#6a11cb', '#2575fc', '#00c6ff'],
  cycleSeconds: 9,
  randomMinWaitSeconds: 5,
  randomMaxWaitSeconds: 14,
  randomShowSeconds: 6,
})

const isHovered = ref(false)
const randomVisible = ref(false)
const dbImages = ref<{ imageUrl: string; title: string }[]>([])
const currentImageIndex = ref(0)

const textVisible = computed(() => isHovered.value || randomVisible.value)

const activeImages = computed(() => {
  if (dbImages.value.length > 0) return dbImages.value.map((i) => i.imageUrl)
  if (props.images && props.images.length > 0) return props.images
  return [] as string[]
})

const useImageMode = computed(() => activeImages.value.length > 0)

const displayText = computed(() => {
  const entry = dbImages.value[currentImageIndex.value]
  if (entry && entry.title) return entry.title
  return props.text || ''
})

const cardStyle = computed(() => {
  if (useImageMode.value) {
    const url = activeImages.value[currentImageIndex.value] || ''
    return { backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  const c = props.colors || ['#6a11cb', '#2575fc', '#00c6ff']
  return {
    '--c1': c[0],
    '--c2': c[1],
    '--c3': c[2],
    '--cycle': `${props.cycleSeconds}s`,
  }
})

let showTimeout: ReturnType<typeof setTimeout> | null = null
let nextTimeout: ReturnType<typeof setTimeout> | null = null
let cycleTimer: ReturnType<typeof setInterval> | null = null

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function scheduleRandomShow() {
  const minW = props.randomMinWaitSeconds || 5
  const maxW = props.randomMaxWaitSeconds || 14
  const showS = props.randomShowSeconds || 6
  const wait = randInt(minW, maxW) * 1000
  nextTimeout = setTimeout(() => {
    if (isHovered.value) { scheduleRandomShow(); return }
    randomVisible.value = true
    showTimeout = setTimeout(() => {
      randomVisible.value = false
      scheduleRandomShow()
    }, showS * 1000)
  }, wait)
}

async function fetchFromDb() {
  if (!props.section) return
  try {
    const data = await fetchSection(props.section)
    if (Array.isArray(data) && data.length > 0) {
      dbImages.value = data.map((item: { imageUrl: string; title: string }) => ({
        imageUrl: imgUrl(item.imageUrl),
        title: item.title || '',
      }))
    }
  } catch (e) {
    console.error('FotosPortaolio fetch error:', e)
  }
}

onMounted(async () => {
  await fetchFromDb()
  scheduleRandomShow()
  const cycleSec = props.cycleSeconds || 9
  if (activeImages.value.length > 1) {
    cycleTimer = setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % activeImages.value.length
    }, cycleSec * 1000)
  }
})

onBeforeUnmount(() => {
  if (showTimeout) clearTimeout(showTimeout)
  if (nextTimeout) clearTimeout(nextTimeout)
  if (cycleTimer) clearInterval(cycleTimer)
})
</script>

<template>
  <div
    class="card"
    :class="{ 'image-mode': useImageMode }"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="overlay" />
    <div class="content" :class="{ visible: textVisible }">
      <slot>{{ displayText }}</slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  width: 380px;
  height: 280px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  transition: filter 250ms ease, box-shadow 250ms ease, transform 250ms ease;
  --c1: #6a11cb;
  --c2: #2575fc;
  --c3: #00c6ff;
  --cycle: 9s;
  background: linear-gradient(135deg, var(--c1), var(--c2));
  animation: bgCycle var(--cycle) ease-in-out infinite;
}

.card:hover {
  filter: brightness(0.88);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
  transform: translateY(-2px);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 250ms ease;
  pointer-events: none;
}

.card:hover .overlay {
  background: rgba(0, 0, 0, 0.12);
}

.content {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  padding: 10px 12px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  line-height: 1.2;
  background: rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 260ms ease, transform 260ms ease;
}

.content.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes bgCycle {
  0%   { background: linear-gradient(135deg, var(--c1), var(--c2)); }
  33%  { background: linear-gradient(135deg, var(--c2), var(--c3)); }
  66%  { background: linear-gradient(135deg, var(--c3), var(--c1)); }
  100% { background: linear-gradient(135deg, var(--c1), var(--c2)); }
}

.image-mode {
  animation: none !important;
}

@media (max-width: 768px) {
  .card {
    width: 330px;
    height: 230px;
  }
}
</style>
