<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PromoCard from '../../ui/ServisesComponents/PromoCard.vue'
import BeforeAfter from '../../ui/informationBlok/beforeAfter.vue';
import TextBlok from '../../ui/informationBlok/TextBlok.vue';
import { imgUrl, fetchSection } from '~/composables/useApi'

const serviceImages = ref<Record<string, string>>({
  kitchen: '',
  bathroom: '',
  tiles: '',
  painting: '',
  electrical: '',
  plumbing: '',
})

async function fetchServiceImage(key: string, section: string) {
  try {
    const data = await fetchSection(section)
    if (Array.isArray(data) && data.length > 0) {
      serviceImages.value[key] = imgUrl(data[0].imageUrl)
    }
  } catch (e) {}
}

onMounted(() => {
  fetchServiceImage('kitchen', 'collectedKitchen')
  fetchServiceImage('bathroom', 'collectedBathroom')
  fetchServiceImage('tiles', 'collectedTiles')
  fetchServiceImage('painting', 'collectedPainting')
  fetchServiceImage('electrical', 'collectedElectrical')
  fetchServiceImage('plumbing', 'collectedPlumbing')
})
</script>

<template>
    <section class="collected-section">
        <div class="container">
            <div class="collected-contaoner">
                <h3 class="collected-title">
                    Choose Your Services
                </h3>

                <div class="collected-box">

                     <PromoCard class="aa"
                     data-aos="fade-up"
                      width="292.5px"
                      height="400px"
                      :bg-image="serviceImages.kitchen"
                      link="/services/KitchenServise"
                      button-text="Kitchen Service"
                    />
                    <div class="before-after-wrap" data-aos="fade-up">
                      <BeforeAfter class="ttt" left-section="beforeAfterLeft" right-section="beforeAfterRight"/>
                    </div>
                    <PromoCard
                    data-aos="fade-up"
                      width="292.5px"
                      height="400px"
                      :bg-image="serviceImages.bathroom"
                      link="/services/BathroomServises"
                      button-text="Bathroom"
                    />
                    <PromoCard
                    data-aos="fade-up"
                      width="380px"
                      height="370px"
                      :bg-image="serviceImages.tiles"
                      link="/services/TilesSection"
                      button-text="Tiles"
                    />
                    <PromoCard
                     data-aos="fade-up"
                      width="370px"
                      height="370px"
                      :bg-image="serviceImages.painting"
                      link="/services/PaintingServises"
                      button-text="Spackling / Painting"
                    />
                    <TextBlok class="ttt-text"
                     data-aos="fade-up"
                        text="
                        Honest Approach. Transparent Pricing. Quality You Can Trust.
We believe in clear communication and no surprises. Every project starts with a detailed estimate, so you always know what to expect.
Our team carefully manages each stage of the work — from planning to final touches — ensuring high-quality results and attention to every detail.
"
                      />
                      <PromoCard
                       data-aos="fade-up"
                      width="575px"
                      height="450px"
                      :bg-image="serviceImages.electrical"
                      link="/services/ElectricalSection"
                      button-text="Electrical Work"
                    />
                    <PromoCard
                     data-aos="fade-up"
                      width="575px"
                      height="450px"
                      :bg-image="serviceImages.plumbing"
                      link="/services/PlumbingSection"
                      button-text="Plumbing"
                    />

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

/* ====== BASE ====== */
.collected-section {
    overflow-x: hidden;
}

.collected-contaoner{
    margin-top: 130px;
}

.collected-title{
    text-align: center;
    margin-bottom: 100px;
}

.collected-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 150px;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
}

/* великі кастомні блоки */
.before-after-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.before-after-label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--color-praymeri-blekText, #555);
}

.ttt{
    width: 530px;
    height: 400px;
}

.ttt-text{
    width: 370px;
    height: 370px;
}


/* ====== 1024px ====== */
@media (max-width: 1024px) {

  .ttt-text {
    height: 450px;
    width: 100% !important;
    max-width: 100%;
  }

  .ttt {
    width: 100% !important;
    max-width: 100%;
    height: 350px;
  }

  .container {
    max-width: 960px;
  }

  .collected-box {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    align-items: stretch;
  }

  .collected-box > * {
    width: 100% !important;
    max-width: 100%;
    min-width: 0;
  }

  .collected-box > :first-child {
    grid-column: span 2;
    width: 100% !important;
  }

  .collected-box :deep(.promo-card) {
    width: 100% !important;
    max-width: 100%;
  }

  .before-after-wrap {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
}


/* ====== 768px ====== */
@media (max-width: 768px) {
  .container {
    max-width: 720px;
  }

  .collected-contaoner {
    margin-top: 80px;
  }

  .collected-title {
    margin-bottom: 60px;
  }

  .collected-box {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
  }

  .collected-box > * {
    width: 100% !important;
    max-width: 100%;
    min-width: 0;
  }

  .collected-box > :first-child {
    grid-column: span 2;
  }

  .ttt {
    width: 100% !important;
    max-width: 100%;
    height: 280px;
  }

  .before-after-wrap {
    min-width: 0;
    max-width: 100%;
  }

  .collected-box :deep(.promo-card) {
    width: 100% !important;
    max-width: 100%;
  }
}


/* ====== 430px ====== */
@media (max-width: 430px) {
  .collected-contaoner {
    margin-top: 70px;
  }

  .collected-title {
    margin-bottom: 40px;
  }

  .collected-box {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
    margin-bottom: 80px;
  }

  .collected-box > * {
    width: 100% !important;
    max-width: 100%;
    min-width: 0;
  }

  .collected-box > :first-child {
    grid-column: span 1;
  }

  .ttt {
    width: 100% !important;
    max-width: 100%;
    height: 240px;
  }

  .ttt-text {
    width: 100% !important;
    max-width: 100%;
    height: auto;
    min-height: 200px;
  }

  .before-after-wrap {
    min-width: 0;
    max-width: 100%;
  }

  .collected-box :deep(.promo-card) {
    width: 100% !important;
    max-width: 100%;
  }
}
</style>