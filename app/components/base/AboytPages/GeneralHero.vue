<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { imgUrl } from '~/composables/useApi'
import Button from "../../ui/Button.vue";

const backgroundImage = ref('')
const sideImage = ref('')
const defaultBg = '/images/about/generalHero.jpg'

async function fetchBackground() {
  try {
    const response = await fetch('http://localhost:3001/section-images/section/generalHero')
    const data = await response.json()
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

async function fetchSideImage() {
  try {
    const response = await fetch('http://localhost:3001/section-images/section/generalHeroSide')
    const data = await response.json()
    if (data && data.length > 0) {
      sideImage.value = imgUrl(data[0].imageUrl)
    }
  } catch (error) {
    console.error('Error fetching side image:', error)
  }
}

const sideImageStyle = computed(() =>
  sideImage.value
    ? { backgroundImage: 'url(' + sideImage.value + ')', backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}
)

onMounted(async () => {
  await Promise.all([fetchBackground(), fetchSideImage()])
})
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
                  :style="sideImageStyle"
                ></div>
                <div class="generel-box">
                    <h1 class="generel-box__title">Built with Responsibility.<br/>Delivered with Results.</h1>
                    <p class="generel-box__pidtext">We specialize in high-quality remodeling and construction, focusing on precision, timelines, and clear communication.
Every project reflects our reputation — that's why we handle every detail from concept to completion.
</p>
                    <Button text="Get Free Estimate" link="/catalog" data-aos="fade-up"/>
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
    background-color: blueviolet;
}

.generel-box{
    margin-top: 90px;
    width: 760px;
}

.generel-box__title{
    font-size: 57px;
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