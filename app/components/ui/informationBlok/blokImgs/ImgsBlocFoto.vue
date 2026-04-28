<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { imgUrl, fetchSection } from '~/composables/useApi'

const props = defineProps<{ section?: string }>()
const imageUrl = ref('')

async function fetchImage() {
  try {
    const data = await fetchSection(props.section || 'imgsBlocFoto')
    if (Array.isArray(data) && data.length > 0) {
      imageUrl.value = imgUrl(data[0].imageUrl)
    }
  } catch (e) {}
}

onMounted(fetchImage)
</script>

<template>
  <div class="img-box">
    <div
      class="img-cont"
      :style="imageUrl
        ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {}"
    >
      <div v-if="!imageUrl" class="img-cont__placeholder">
        <span>Фото</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-box {
  margin-top: 55px;
}

.img-cont {
  height: 500px;
  width: 550px;
  background-color: #1a1a1a;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.img-cont__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
  font-size: 14px;
}
</style>
