<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

const props = defineProps<{
  colors: string[]
}>()

const currentIndex = ref(0)

const currentColor = computed(() => {
  if (!props.colors.length) return "#ccc"
  return props.colors[currentIndex.value]
})

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value =
      (currentIndex.value + 1) % props.colors.length
  }, 7000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="color-block"
    :style="{ backgroundColor: currentColor }"
  />
</template>

<style scoped>
.color-block {
  width: 100%;
  height: 450px;
  border-radius: 16px;
  transition: background-color 0.8s ease-in-out;
}
</style>