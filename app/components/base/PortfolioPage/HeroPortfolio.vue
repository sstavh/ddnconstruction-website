<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { imgUrl, fetchSection } from '~/composables/useApi'

const backgroundImage = ref('')
const defaultBg = '/images/portfolio/hero.jpg'

async function fetchBackground() {
  try {
    const data = await fetchSection('portfolio')
    if (data && data.length > 0) {
      backgroundImage.value = imgUrl(data[0].imageUrl)
    } else {
      backgroundImage.value = defaultBg
    }
  } catch (error) {
    console.error('Error fetching background:', error)
    backgroundImage.value = defaultBg
  }
}

onMounted(async () => {
  await fetchBackground()
})
</script>

<template>
    <section 
        class="heroAbaut-section"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
        <div class="overlay"></div>
        <div class="container">
            <div class="heroAbaut-container">
                <div class="heroAbout-container-box">
                    <h1 class="heroAbout-box__title">
                        <span class="title-text">Portfolio</span>
                    </h1>
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
    background-repeat: no-repeat;
    position: relative;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0)
    );
    z-index: 1;
}

.heroAbaut-section .container {
    position: relative;
    z-index: 2;
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

 @media (max-width: 430px){
    .heroAbout-box__title{
        padding-top: 150px;
        font-size: var(  --font-s-Mobalh1);
    }
    .heroAbaut-section{
        height: 330px;
    }
  }
</style>