<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { imgUrl, fetchSection } from '~/composables/useApi'

const props = defineProps<{ section?: string }>()
const imageUrl = ref('')

async function fetchImage() {
  try {
    const data = await fetchSection(props.section || 'fotoImgTest')
    if (Array.isArray(data) && data.length > 0) {
      imageUrl.value = imgUrl(data[0].imageUrl)
    }
  } catch (e) {}
}

onMounted(fetchImage)
</script>

<template>
  <div
    class="foto-img-test"
    :style="imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
  >
    <div v-if="!imageUrl" class="foto-img-test__placeholder">
      <span>Фото</span>
    </div>
  </div>
</template>

<style scoped>
.foto-img-test {
  border-radius: 20px;
  width: 100%;
  height: 100%;
  min-height: 280px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  position: relative;
  overflow: hidden;
}

.foto-img-test__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
  font-size: 14px;
}
</style>
