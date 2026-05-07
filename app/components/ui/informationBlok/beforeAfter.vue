<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { imgUrl, fetchSection } from '~/composables/useApi'

const props = withDefaults(defineProps<{
  leftColor?: string
  rightColor?: string
  modelValue?: number
  leftSection?: string
  rightSection?: string
}>(), {
  leftColor: '#22c55e',
  rightColor: '#3b82f6',
  modelValue: 50,
})

const emit = defineEmits(['update:modelValue'])

const wrap = ref<HTMLElement | null>(null)
const dragging = ref(false)
const pos = ref(props.modelValue)

const leftImage = ref('')
const rightImage = ref('')

async function fetchImages() {
  if (props.leftSection) {
    try {
      const data = await fetchSection(props.leftSection)
      if (Array.isArray(data) && data.length > 0) leftImage.value = imgUrl(data[0].imageUrl)
    } catch (e) {}
  }
  if (props.rightSection) {
    try {
      const data = await fetchSection(props.rightSection)
      if (Array.isArray(data) && data.length > 0) rightImage.value = imgUrl(data[0].imageUrl)
    } catch (e) {}
  }
}

onMounted(fetchImages)

// правий (базовий) фон
const baseStyle = computed(() => {
  if (rightImage.value) {
    return { backgroundImage: `url(${rightImage.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  return { background: props.rightColor }
})

// лівий шар (clip до pos%)
const leftLayerStyle = computed(() => {
  if (leftImage.value) {
    return {
      backgroundImage: `url(${leftImage.value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      clipPath: `inset(0 ${100 - pos.value}% 0 0)`,
    }
  }
  return {
    background: props.leftColor,
    clipPath: `inset(0 ${100 - pos.value}% 0 0)`,
  }
})

// Fallback: якщо немає окремих секцій — стара логіка (gradient)
const useLayered = computed(() => leftImage.value || rightImage.value || props.leftSection || props.rightSection)

const bgStyle = computed(() => ({
  background: `linear-gradient(90deg,
    ${props.leftColor} 0%,
    ${props.leftColor} ${pos.value}%,
    ${props.rightColor} ${pos.value}%,
    ${props.rightColor} 100%
  )`
}))

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function setFromX(clientX: number) {
  const el = wrap.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = clamp(clientX - rect.left, 0, rect.width)
  pos.value = (x / rect.width) * 100
  emit('update:modelValue', pos.value)
}

function onDown(e: PointerEvent) { dragging.value = true; setFromX(e.clientX) }
function onMove(e: PointerEvent) { if (!dragging.value) return; setFromX(e.clientX) }
function onUp() { dragging.value = false }
</script>

<template>
  <div
    ref="wrap"
    class="slider"
    :style="useLayered ? baseStyle : bgStyle"
    @pointerdown="onDown"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointerleave="onUp"
  >
    <!-- лівий шар поверх правого -->
    <div v-if="useLayered" class="left-layer" :style="leftLayerStyle"></div>

    <div class="handle" :style="{ left: `calc(${pos}% - 20px)` }">
      <div class="line"></div>
      <div class="knob">⇆</div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 280px;
  border-radius: 16px;
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
}

.left-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
}

.line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 5px;
  transform: translateX(-50%);
  background: white;
}

.knob {
  color: var(--color-praymeri-blek);
  font-size: var(--font-s-h4);
  font-weight: var(--font-w-h1);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
