<template>
  <div
    ref="cardRef"
    class="smart-card"
    :style="cardStyle"
    @mouseenter="showCloud"
    @mouseleave="hideCloud"
  >
    <div class="card-darkness"></div>

    <div
      class="info-cloud"
      :class="[
        `pos-x-${cloudX}`,
        `pos-y-${cloudY}`,
        { visible: isHovered }
      ]"
      :style="cloudCssVars"
    >
      <div v-if="logo" class="logo-wrap">
        <img :src="logo" :alt="title || 'logo'" class="logo" />
      </div>

      <div class="cloud-texts">
        <h3 v-if="title" class="cloud-title">{{ title }}</h3>
        <p v-if="description" class="cloud-description">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

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
const cloudX = ref<'left' | 'right'>('left')
const cloudY = ref<'top' | 'bottom'>('bottom')

const cardStyle = computed(() => ({
  backgroundColor: props.blockColor,
  backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: props.height,
  borderRadius: props.radius
}))

const cloudCssVars = computed(() => {
  const fallback = ['#3b82f6', '#8b5cf6', '#22c55e']
  const safeColors = [...props.colors, ...fallback].slice(0, 3)

  return {
    '--cloud-color-1': safeColors[0],
    '--cloud-color-2': safeColors[1],
    '--cloud-color-3': safeColors[2]
  }
})

function updateCloudPosition() {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const viewportCenterX = window.innerWidth / 2
  const viewportCenterY = window.innerHeight / 2

  cloudX.value = centerX > viewportCenterX ? 'right' : 'left'
  cloudY.value = centerY > viewportCenterY ? 'top' : 'bottom'
}

async function showCloud() {
  await nextTick()
  updateCloudPosition()
  isHovered.value = true
}

function hideCloud() {
  isHovered.value = false
}

function handleResize() {
  if (isHovered.value) {
    updateCloudPosition()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleResize, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleResize, true)
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
  transform: translateY(-10px);
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
  position: absolute;
  z-index: 10;
  width: min(340px, calc(100% - 32px));
  min-height: 170px;
  padding: 20px;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;

  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 18px 50px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255,255,255,0.08);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  animation: cloudColorSwitch 6s infinite ease-in-out;
}

/* позиція всередині блоку */
.pos-x-left {
  left: 16px;
}

.pos-x-right {
  right: 16px;
}

.pos-y-top {
  top: 16px;
}

.pos-y-bottom {
  bottom: 16px;
}

/* стартова анімація */
.pos-x-left.pos-y-bottom {
  transform: translate(-8px, 8px) scale(0.96);
}

.pos-x-right.pos-y-bottom {
  transform: translate(8px, 8px) scale(0.96);
}

.pos-x-left.pos-y-top {
  transform: translate(-8px, -8px) scale(0.96);
}

.pos-x-right.pos-y-top {
  transform: translate(8px, -8px) scale(0.96);
}

.info-cloud.visible {
  opacity: 1;
  pointer-events: auto;
}

.info-cloud.visible.pos-x-left.pos-y-bottom,
.info-cloud.visible.pos-x-right.pos-y-bottom,
.info-cloud.visible.pos-x-left.pos-y-top,
.info-cloud.visible.pos-x-right.pos-y-top {
  transform: translate(0, 0) scale(1);
}

.logo-wrap {
  width: fit-content;
  padding: 10px;
  border-radius: 16px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.14);
}

.logo {
  width: 62px;
  height: 62px;
  object-fit: contain;
  display: block;
}

.cloud-texts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cloud-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.15;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0,0,0,0.24);
}

.cloud-description {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #f8fafc;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

@keyframes cloudColorSwitch {
  0% {
    background: rgba(59, 130, 246, 0.28);
  }
  33% {
    background: rgba(139, 92, 246, 0.28);
  }
  66% {
    background: rgba(34, 197, 94, 0.28);
  }
  100% {
    background: rgba(59, 130, 246, 0.28);
  }
}

@media (max-width: 768px) {
  .info-cloud {
    width: calc(100% - 24px);
    left: 12px !important;
    right: 12px !important;
    bottom: 12px !important;
    top: auto !important;
  }

  .cloud-title {
    font-size: 20px;
  }

  .cloud-description {
    font-size: 14px;
  }

  .logo {
    width: 54px;
    height: 54px;
  }
}
</style>