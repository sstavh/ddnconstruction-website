<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Button from "../../ui/Button.vue";
import { imgUrl } from '~/composables/useApi'

const sideImage = ref('')
const pageTitle = ref('Our Recent Projects')
const pageSubtitle = ref('See Our Work in Action')

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3001/section-images/section/generalHeroPortfolio')
    const data = await response.json()
    if (data && data.length > 0) {
      sideImage.value = imgUrl(data[0].imageUrl)
      if (data[0].title) pageTitle.value = data[0].title
      if (data[0].description) pageSubtitle.value = data[0].description
    }
  } catch (error) {
    console.error('Error fetching portfolio hero data:', error)
  }
}

onMounted(fetchData)
</script>

<template>
    <section>
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
                    <Button text="Request a Quote" link="/catalog" data-aos="fade-up"/>
                </div>
            </div>
        </div>
        </div>
    </section>
</template>

<style scoped>
section {
    position: relative;
    background: var(--color-praymeri-bg, #fff);
}

section .container {
    position: relative;
}

.general-container{
    margin-top: 160px;
    margin-bottom: 100px;
}

.general-container__box{
    display: flex;
    gap: 55px;
    justify-content: center;
    align-items: flex-start;
}

.foto-test{
    width: 580px;
    height: 500px;
    background-color: #1a1a2e;
    border-radius: 16px;
    overflow: hidden;
    flex-shrink: 0;
}

.generel-box{
    margin-top: 90px;
}

.generel-box__title {
    font-size: 48px;
    font-weight: 700;
}

.generel-box__pidtext{
    padding: 20px 0;
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
    font-size: var(--font-s-Mobalh1);
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