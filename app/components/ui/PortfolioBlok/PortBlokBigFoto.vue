<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

const props = defineProps<{
  colors?: string[]
  sections?: string[]
}>()

const currentIndex = ref(0)
const photos = ref<string[]>([])

async function fetchPhotos() {
  if (!props.sections || props.sections.length === 0) return
  const results: string[] = []
  for (const section of props.sections) {
    try {
      const res = await fetch(`http://localhost:3001/section-images/section/${section}`)
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const url = data[0].imageUrl
        results.push(url.startsWith('http') ? url : `http://localhost:3001/${url}`)
      }
    } catch (e) {}
  }
  photos.value = results
}

const usePhotos = computed(() => photos.value.length > 0)

const currentColor = computed(() => {
  const colors = props.colors || ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#845EC2"]
  return colors[currentIndex.value % colors.length]
})

const currentPhoto = computed(() => photos.value[currentIndex.value % photos.value.length] || '')

let timer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await fetchPhotos()
  timer = setInterval(() => {
    const total = usePhotos.value ? photos.value.length : (props.colors?.length || 5)
    currentIndex.value = (currentIndex.value + 1) % total
  }, 7000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="color-block"
    :style="usePhotos
      ? { backgroundImage: `url(${currentPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : { backgroundColor: currentColor }"
  />
</template>

<style scoped>
.color-block {
  width: 100%;
  height: 450px;
  border-radius: 16px;
  transition: background-color 0.8s ease-in-out, background-image 0.8s ease-in-out;
}
</style>
