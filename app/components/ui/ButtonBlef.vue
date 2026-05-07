<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { fetchSection, imgUrl } from '~/composables/useApi'

const props = withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Button'
})

const logoUrl = ref('')

onMounted(async () => {
  try {
    const data = await fetchSection('headerLogo')
    if (Array.isArray(data) && data.length > 0) {
      logoUrl.value = imgUrl(data[0].imageUrl ?? '')
    }
  } catch {}
})
</script>

<template>
  <NuxtLink to="/" class="buttonBlef" :class="{ 'buttonBlef--img': logoUrl }">
    <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="logo-img" />
    <p v-else>{{ props.text }}</p>
  </NuxtLink>
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
  text-decoration: none;
}

.buttonBlef--img {
  padding: 0;
  border: none;
  background-color: transparent;
  max-width: 210px;
}

.logo-img {
  display: block;
  max-height: 64px;
  max-width: 210px;
  width: auto;
  height: auto;
  object-fit: contain;
}
</style>