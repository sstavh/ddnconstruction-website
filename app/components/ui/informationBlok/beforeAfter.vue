<template>
  <div
    ref="wrap"
    class="slider"
    :style="bgStyle"
    @pointerdown="onDown"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointerleave="onUp"
  >
    <div
      class="handle"
      :style="{ left: `calc(${pos}% - 20px)` }"
    >
      <div class="line"></div>
      <div class="knob">⇆</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  leftColor?: string
  rightColor?: string
  modelValue?: number
}>(), {
  leftColor: '#22c55e',
  rightColor: '#3b82f6',
  modelValue: 50,
})

const emit = defineEmits(['update:modelValue'])

const wrap = ref<HTMLElement | null>(null)
const dragging = ref(false)
const pos = ref(props.modelValue)

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

function onDown(e: PointerEvent) {
  dragging.value = true
  setFromX(e.clientX)
}

function onMove(e: PointerEvent) {
  if (!dragging.value) return
  setFromX(e.clientX)
}

function onUp() {
  dragging.value = false
}
</script>

<style scoped>
.slider {
  position: relative;
  width: 470px;
  height: 350px;
  border-radius: 16px;
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
  
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
  width: 2px;
  transform: translateX(-50%);
  background: white;
}

.knob {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>