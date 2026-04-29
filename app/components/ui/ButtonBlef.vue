<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Button'
})

const logoUrl = ref('')

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3001/section-images/section/headerLogo')
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      const url = data[0].imageUrl
      logoUrl.value = url?.startsWith('http') ? url : `http://localhost:3001/${url}`
    }
  } catch {}
})
</script>

<template>
  <div class="buttonBlef" :class="{ 'buttonBlef--img': logoUrl }">
    <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="logo-img" />
    <p v-else>{{ props.text }}</p>
  </div>
</template>

<style scoped>
.buttonBlef {
  padding: 10px 15px;
  border: 1px solid #000;
  background-color: var(--color-praymeri-blue);
  display: block;
  max-width: 182px;
  color: white;
  font-weight: 600;
  font-size: 13px;
  border-radius: 8px;
}

.buttonBlef--img {
  padding: 0;
  border: none;
  background-color: transparent;
  max-width: 160px;
}

.logo-img {
  display: block;
  max-height: 44px;
  max-width: 160px;
  width: auto;
  height: auto;
  object-fit: contain;
}
</style>