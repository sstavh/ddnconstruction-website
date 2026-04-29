<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Button from '../../ui/Button.vue'
import { imgUrl } from '~/composables/useApi'

interface Props {
  title: string
  buttonText: string
  buttonLink: string
  section?: string
}

const props = defineProps<Props>()
const backgroundImage = ref('')

onMounted(async () => {
  if (!props.section) return
  try {
    const res = await fetch(`http://localhost:3001/section-images/section/${props.section}`)
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) backgroundImage.value = imgUrl(data[0].imageUrl)
  } catch (e) {
    console.error('HeroSECComponent fetch error:', e)
  }
})
</script>

<template>
  <section
    class="heroAbaut-section"
    :style="backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}"
  >
    <div class="container">
      <div class="heroAbaut-container">
        <div class="heroAbout-container-box">

          <h1 class="heroAbout-box__title">
            <span class="title-text">
              {{ title }}
            </span>
          </h1>

          <div class="heroButton-box">
            <Button :to="buttonLink">
              {{ buttonText }}
            </Button>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.heroAbaut-section{
  margin-top: -60px;
  height: 470px;
  background-size: cover;
  background-position: center;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0)
    ),
    #1a1a2e;
}

.heroAbout-box__title{
  padding-top: 180px;
  text-align: center;
  width: 100%;
  display: inline-block;
  border-bottom: 2px solid var(--color-secondary-steel);
  padding-bottom: 40px;
}

.title-text{
  display: inline-block;
  opacity: 0;
  animation: fadeUp 1s ease forwards;
}

@keyframes fadeUp{
  from{
    opacity: 0;
    transform: translateY(40px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
}

.heroButton-box{
  margin-top: 45px;
  text-align: center;
}

@media (max-width: 430px) {
  .heroAbout-box__title{
    font-size: var(--font-s-Mobalh1);
  }
}
  
</style>