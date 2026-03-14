<template>
  <div
    ref="cardRef"
    class="smart-card"
    :style="cardStyle"
    @mouseenter="showCloud"
    @mouseleave="hideCloud"
  >
    <div class="card-darkness"></div>
  </div>

  <Teleport to="body">
    <div
      v-if="isHovered || isClosing"
      class="info-cloud"
      :class="[
        `side-${cloudSide}`,
        { visible: isHovered, closing: isClosing }
      ]"
      :style="cloudStyle"
      @mouseenter="showCloud"
      @mouseleave="hideCloud"
    >
      <div class="cloud-bg bg-1"></div>
      <div class="cloud-bg bg-2"></div>
      <div class="cloud-bg bg-3"></div>

      <div class="cloud-tail"></div>

      <div v-if="logo" class="logo-wrap">
        <img :src="logo" :alt="title || 'logo'" class="logo" />
      </div>

      <div class="cloud-texts">
        <h3 v-if="title" class="cloud-title">{{ title }}</h3>
        <p v-if="description" class="cloud-description">{{ description }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  logo?: string
  title?: string
  description?: string
  colors?: string[]
  blockColor?: string
  height?: string
  radius?: string
  bgImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  logo: '',
  title: '',
  description: '',
  colors: () => ['#3b82f6', '#8b5cf6', '#22c55e'],
  blockColor: '#0f172a',
  height: '420px',
  radius: '28px',
  bgImage: ''
})

const cardRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const isClosing = ref(false)

const cloudSide = ref<'left' | 'right' | 'top' | 'bottom'>('right')
const cloudTop = ref(0)
const cloudLeft = ref(0)

const GAP = 18
const CLOUD_WIDTH = 720
const CLOUD_HEIGHT = 440
const VIEWPORT_PADDING = 12
const ANIMATION_DURATION = 320

let hideTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null

const cardStyle = computed(() => ({
  backgroundColor: props.blockColor,
  backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: props.height,
  borderRadius: props.radius
}))

const cloudStyle = computed(() => {
  const fallback = ['#3b82f6', '#8b5cf6', '#22c55e']
  const safeColors = [...props.colors, ...fallback].slice(0, 3)
  const width = Math.min(CLOUD_WIDTH, window.innerWidth - VIEWPORT_PADDING * 2)

  return {
    top: `${cloudTop.value}px`,
    left: `${cloudLeft.value}px`,
    '--cloud-width': `${width}px`,
    '--cloud-color-1': safeColors[0],
    '--cloud-color-2': safeColors[1],
    '--cloud-color-3': safeColors[2]
  }
})

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max))
}

function updateCloudPosition() {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  const cloudWidth = Math.min(CLOUD_WIDTH, vw - VIEWPORT_PADDING * 2)
  const cloudHeight = Math.min(CLOUD_HEIGHT, vh - VIEWPORT_PADDING * 2)

  const freeSpace = {
    right: vw - rect.right,
    left: rect.left,
    bottom: vh - rect.bottom,
    top: rect.top
  }

  const candidates = [
    { side: 'right', fits: freeSpace.right >= cloudWidth + GAP },
    { side: 'left', fits: freeSpace.left >= cloudWidth + GAP },
    { side: 'bottom', fits: freeSpace.bottom >= cloudHeight + GAP },
    { side: 'top', fits: freeSpace.top >= cloudHeight + GAP }
  ] as const

  const fitted = candidates.find((item) => item.fits)

  if (fitted) {
    cloudSide.value = fitted.side
  } else {
    const best = Object.entries(freeSpace).sort((a, b) => b[1] - a[1])[0]
    cloudSide.value = best[0] as 'left' | 'right' | 'top' | 'bottom'
  }

  let top = 0
  let left = 0

  switch (cloudSide.value) {
    case 'right':
      left = rect.right + GAP
      top = rect.top + rect.height / 2 - cloudHeight / 2
      break

    case 'left':
      left = rect.left - cloudWidth - GAP
      top = rect.top + rect.height / 2 - cloudHeight / 2
      break

    case 'bottom':
      left = rect.left + rect.width / 2 - cloudWidth / 2
      top = rect.bottom + GAP
      break

    case 'top':
      left = rect.left + rect.width / 2 - cloudWidth / 2
      top = rect.top - cloudHeight - GAP
      break
  }

  cloudLeft.value = clamp(left, VIEWPORT_PADDING, vw - cloudWidth - VIEWPORT_PADDING)
  cloudTop.value = clamp(top, VIEWPORT_PADDING, vh - cloudHeight - VIEWPORT_PADDING)
}

function clearTimers() {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }

  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

async function showCloud() {
  clearTimers()
  isClosing.value = false
  isHovered.value = true

  await nextTick()
  updateCloudPosition()
}

function startCloseAnimation() {
  if (!isHovered.value && !isClosing.value) return

  clearTimers()
  isHovered.value = false
  isClosing.value = true

  closeTimer = setTimeout(() => {
    isClosing.value = false
  }, ANIMATION_DURATION)
}

function hideCloud() {
  hideTimer = setTimeout(() => {
    startCloseAnimation()
  }, 60)
}

function handleResize() {
  if (isHovered.value || isClosing.value) {
    updateCloudPosition()
  }
}

function handleScroll() {
  if (isHovered.value) {
    startCloseAnimation()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll, true)
  clearTimers()
})
</script>

<style scoped>
.smart-card {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 280px;
  isolation: isolate;
  cursor: pointer;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
}

.smart-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.34);
}

.card-darkness {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.42);
  transition: opacity 0.35s ease;
}

.smart-card:hover .card-darkness {
  opacity: 0.08;
}

.info-cloud {
  position: fixed;
  z-index: 9999;
  width: var(--cloud-width);
  min-height: 440px;

   max-width: min(720px, calc(100vw - 24px));
  padding: 24px;
  border-radius: 26px;
  overflow: visible;

  display: flex;
  flex-direction: column;
  gap: 16px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.34),
    0 10px 24px rgba(0, 0, 0, 0.18);

  background: #111827;

  opacity: 0;
  pointer-events: none;
}

.info-cloud.visible {
  opacity: 1;
  pointer-events: auto;
}

.info-cloud,
.logo-wrap {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

/* ФОНИ */
.cloud-bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 0;
  opacity: 0;
  pointer-events: none;
}

.bg-1 {
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.06), transparent 35%),
    linear-gradient(
      135deg,
      var(--cloud-color-1),
      color-mix(in srgb, var(--cloud-color-1) 68%, #000 32%)
    );
  animation: cloudLayer1 12s infinite ease-in-out;
}

.bg-2 {
  background:
    radial-gradient(circle at 80% 25%, rgba(255, 255, 255, 0.05), transparent 35%),
    linear-gradient(
      135deg,
      var(--cloud-color-2),
      color-mix(in srgb, var(--cloud-color-2) 68%, #000 32%)
    );
  animation: cloudLayer2 12s infinite ease-in-out;
}

.bg-3 {
  background:
    radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.04), transparent 35%),
    linear-gradient(
      135deg,
      var(--cloud-color-3),
      color-mix(in srgb, var(--cloud-color-3) 68%, #000 32%)
    );
  animation: cloudLayer3 12s infinite ease-in-out;
}

.logo-wrap,
.cloud-texts {
  position: relative;
  z-index: 2;
}

/* ХВІСТ */
.cloud-tail {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  filter: none;
  opacity: -20;
}

/* справа */
.side-right .cloud-tail {
  left: -22px;
  top: 50%;
  width: 34px;
  height: 88px;
  border-radius: 24px 0 0 24px;
  
}

/* зліва */
.side-left .cloud-tail {
  right: -22px;
  top: 50%;
  width: 34px;
  height: 88px;
  border-radius: 0 24px 24px 0;
  
}

/* зверху */
.side-top .cloud-tail {
  left: 50%;
  bottom: -22px;
  width: 88px;
  height: 34px;
  border-radius: 0 0 24px 24px;
  
}

/* знизу */
.side-bottom .cloud-tail {
  left: 50%;
  top: -22px;
  width: 88px;
  height: 34px;
  border-radius: 24px 24px 0 0;
 
}

/* світіння */
.side-right::before,
.side-left::before,
.side-top::before,
.side-bottom::before {
  content: '';
  position: absolute;
  z-index: 1;
  pointer-events: none;
  filter: blur(18px);
  opacity: 0.65;
}

.side-right::before {
  left: -14px;
  top: 50%;
  width: 26px;
  height: 96px;
}

.side-left::before {
  right: -14px;
  top: 50%;
  width: 26px;
  height: 96px;
}

.side-top::before {
  left: 50%;
  bottom: -14px;
  width: 96px;
  height: 26px;
}

.side-bottom::before {
  left: 50%;
  top: -14px;
  width: 96px;
  height: 26px;
}

.logo-wrap {
  width: fit-content;
  padding: 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  width: 74px;
  height: 74px;
  object-fit: contain;
  display: block;
}

.cloud-texts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cloud-title {
  margin: 0;
  font-size: 28px;
  line-height: 1.15;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.24);
}

.cloud-description {
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: #f8fafc;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* напрямок */
.side-right {
  transform-origin: left center;
}

.side-left {
  transform-origin: right center;
}

.side-top {
  transform-origin: center bottom;
}

.side-bottom {
  transform-origin: center top;
}

/* ВИЛІТАННЯ */
.side-right.visible {
  animation: flyOutRight 0.32s ease forwards;
}

.side-left.visible {
  animation: flyOutLeft 0.32s ease forwards;
}

.side-top.visible {
  animation: flyOutTop 0.32s ease forwards;
}

.side-bottom.visible {
  animation: flyOutBottom 0.32s ease forwards;
}

/* ПОВЕРНЕННЯ В БЛОК */
.side-right.closing {
  animation: flyBackRight 0.32s ease forwards;
}

.side-left.closing {
  animation: flyBackLeft 0.32s ease forwards;
}

.side-top.closing {
  animation: flyBackTop 0.32s ease forwards;
}

.side-bottom.closing {
  animation: flyBackBottom 0.32s ease forwards;
}

@keyframes flyOutRight {
  from {
    opacity: 0;
    transform: translateX(-40px) scale(0.82);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes flyOutLeft {
  from {
    opacity: 0;
    transform: translateX(40px) scale(0.82);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes flyOutTop {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.82);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes flyOutBottom {
  from {
    opacity: 0;
    transform: translateY(-40px) scale(0.82);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes flyBackRight {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-40px) scale(0.82);
  }
}

@keyframes flyBackLeft {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(40px) scale(0.82);
  }
}

@keyframes flyBackTop {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(40px) scale(0.82);
  }
}

@keyframes flyBackBottom {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-40px) scale(0.82);
  }
}

/* кольори */
@keyframes cloudLayer1 {
  0%,
  30% {
    opacity: 1;
  }
  45%,
  100% {
    opacity: 0;
  }
}

@keyframes cloudLayer2 {
  0%,
  20% {
    opacity: 0;
  }
  35%,
  65% {
    opacity: 1;
  }
  80%,
  100% {
    opacity: 0;
  }
}

@keyframes cloudLayer3 {
  0%,
  55% {
    opacity: 0;
  }
  70%,
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .info-cloud {
    width: calc(100vw - 24px) !important;
    min-height: auto;
    padding: 18px;
  }

  .cloud-title {
    font-size: 22px;
  }

  .cloud-description {
    font-size: 14px;
    line-height: 1.6;
  }

  .logo {
    width: 58px;
    height: 58px;
  }

  .side-right .cloud-tail,
  .side-left .cloud-tail {
    height: 72px;
  }

  .side-top .cloud-tail,
  .side-bottom .cloud-tail {
    width: 72px;
  }
}
</style>