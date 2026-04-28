<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Button from "../../ui/Button.vue";
import { imgUrl } from '~/composables/useApi'

const backgroundImage = ref('')
const sideImage = ref('')
const pageTitle = ref('Our Recent Projects')
const pageSubtitle = ref('See Our Work in Action')
const defaultBg = '/images/portfolio/generalHero.jpg'

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3001/section-images/section/generalHeroPortfolio')
    const data = await response.json()
    if (data && data.length > 0) {
      backgroundImage.value = imgUrl(data[0].imageUrl) || defaultBg
      if (data[0].title) pageTitle.value = data[0].title
      if (data[0].description) pageSubtitle.value = data[0].description
    } else {
      backgroundImage.value = defaultBg
    }
    if (data && data.length > 1) {
      sideImage.value = imgUrl(data[1].imageUrl)
    }
  } catch (error) {
    console.error('Error fetching background:', error)
    backgroundImage.value = defaultBg
  }
}

onMounted(fetchData)
</script>

<template>
    <section :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="overlay"></div>
        <div class="container">
        <div class="general-container">
            <div class="general-container__box">
                <div
                  data-aos="fade-right"
                  class="foto-test"
                  :style="sideImage ? { backgroundImage: `url(${sideImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
                ></div>
                <div class="generel-box">
                    <h1 class="generel-box__title">{{ pageTitle }}</h1>
                    <p class="generel-box__pidtext">{{ pageSubtitle }}</p>
                    <Button ext="Request a Quote" link="/catalog" data-aos="fade-up"/>
                </div>
            </div>
        </div>
        </div>
    </section>
</template>

<style scoped>
section {
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
    background: rgba(255, 255, 255, 0.85);
    z-index: 1;
}

section .container {
    position: relative;
    z-index: 2;
}

.general-container{
    margin-top: 160px;
    margin-bottom: 100px;
}

.general-container__box{
    display: flex;
    gap: 55px;
    justify-content: center;
}

.foto-test{
    width: 580px;
    height: 500px;
    background-color: #1a1a2e;
    border-radius: 12px;
    overflow: hidden;
}

.generel-box{
    margin-top: 90px;
}

.generel-box__pidtext{
    padding:  20px 0px 20px 0px;
    font-size: --font-s-textSmoll;
    color: var(--color-praymeri-blekText);
}

@media (max-width: 1024px) {
  .foto-test{
    height: 420px;
    width: 470px;
  }

  .general-container{
    margin-top: 100px;
  }
  }

  @media (max-width: 768px) {
    .foto-test{
        display: none;
    }

    .general-container__box{
        margin-left: 70px;
        display: block;
    }
  }
   @media (max-width: 430px) {
  .generel-box__title{
    font-size: var(  --font-s-Mobalh1);
    text-align: center;
  }

  .general-container__box{
    margin-left: 0;
  }

  .generel-box{
    text-align: center;
  }
  }
</style>