<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { imgUrl } from '~/composables/useApi'

const backgroundImage = ref('')
const apiUrl = useRuntimeConfig().public.apiUrl

async function fetchBackground() {
  try {
    const response = await fetch(`${apiUrl}/section-images/section/services`)
    const data = await response.json()
    if (data && data.length > 0) {
      backgroundImage.value = imgUrl(data[0].imageUrl)
    }
  } catch (error) {
    console.error('Error fetching background:', error)
  }
}

onMounted(async () => {
  await fetchBackground()
})
</script>

<template>
    <section
        class="heroAbaut-section"
        :style="backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}"
    >
        <div class="overlay"></div>
        <div class="container">
            <div class="heroAbaut-container">
                <div class="heroAbout-container-box">
                    <h1 class="heroAbout-box__title">
                        <span class="title-text">Services</span>
                    </h1>
                    <p class="hero-subtitle">
                        Expert renovation from start to finish — kitchens, bathrooms, electrical, plumbing, tiles & painting.
                    </p>

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.heroAbaut-section{
    position: relative;
    margin-top: -60px;
    height: 470px;
    background-color: #1a1a2e;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.85),
        rgba(0, 0, 0, 0.2)
    );
    z-index: 0;
}

.container {
    position: relative;
    z-index: 1;
}

.heroAbout-box__title{
    padding-top: 180px;
    text-align: center;
    width: 100%;
    display: inline-block;
    border-bottom: 2px solid var(--color-secondary-steel);
    padding-bottom: 40px;
}

/* Анімується тільки текст */
.title-text{
    display: inline-block;
    opacity: 0;
    animation: fadeUp 1s ease forwards;
}

.hero-subtitle {
    text-align: center;
    color: rgba(255, 255, 255, 0.65);
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 0.3px;
    margin-top: 20px;
    opacity: 0;
    animation: fadeUp 1s ease 0.3s forwards;
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

@media (max-width: 768px) {
  .heroAbout-box__title {
    padding-top: 150px;
  }
  .heroAbaut-section {
    height: 430px;
  }
  .hero-subtitle {
    font-size: 15px;
  }
}

@media (max-width: 430px){
    .heroAbout-box__title{
        padding-top: 120px;
        font-size: var(--font-s-Mobalh1);
    }
    .heroAbaut-section{
        height: 330px;
    }
    .hero-subtitle {
      font-size: 14px;
      padding: 0 10px;
    }
  }
</style>