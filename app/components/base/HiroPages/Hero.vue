<script setup lang="ts">
import { ref } from 'vue';
import ImdSwicher from '../../ui/bagFons/ImgSwitcher.vue';
import TypeTextt from '../../ui/TypedText.vue';
import BaseModalTest from '../../ui/BaseModalTest.vue';
import FormСontact from '../../ui/FormsComponents/FormСontact.vue';

const open = ref(false);
const origin = ref<{ x: number; y: number } | null>(null);

const openFromClick = (e: MouseEvent) => {
  origin.value = { x: e.clientX, y: e.clientY };
  open.value = true;
};
</script>


<template>
<section>
    <ImdSwicher />
    <div class="container">
        <div class="hiro-container">
            <div class="hero-container__box">
                <h1 class="hero-box__logo">
                      <TypeTextt text="We Build Spaces You're Proud to Live In." />
                </h1>
                <p data-aos="fade-right" class="hero-box__pidtext">Full-service renovation — kitchens, bathrooms, electrical, plumbing, tiles & painting. Quality work, transparent pricing, on-time delivery.</p>

                <button data-aos="fade-up" class="hero-contact-btn" @click="openFromClick">
                  Contact Us
                </button>
            </div>
        </div>
    </div>

    <BaseModalTest :open="open" :origin="origin" @close="open = false">
      <FormСontact  class="ttr"/>
    </BaseModalTest>
</section>
</template>

<style scoped>
.hiro-container{
    margin-left: 45px;
    padding-top: 170px;
}

.hero-box__logo {

    max-width: 570px;
    font-weight: 700px;
    margin-bottom: 15px;
}

.hero-box__pidtext{
    color: var(--color-praymeri-light);
    max-width: 440px;
    margin-bottom: 24px;
}

.hero-contact-btn {
    padding: 14px 32px;
    border: none;
    border-radius: 10px;
    background: var(--color-praymeri-blue);
    color: #fff;
    font-family: var(--font-f-Inter);
    font-size: var(--font-s-button);
    font-weight: var(--font-w-button);
    cursor: pointer;
    transition: 0.25s ease;
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.3);
}

.hero-contact-btn:hover {
    background: var(--color-praymeri-blueHover);
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(59, 130, 246, 0.42);
}
@media (max-width: 768px) {
  .hiro-container {
    padding-top: 130px;
    margin-left: 0;
  }

  .hero-box__logo {
    max-width: 100%;
  }

  .hero-box__pidtext {
    max-width: 100%;
  }
}

@media (max-width: 430px) {
  .hiro-container {
    padding-top: 100px;
    margin-left: 0;
  }

  .hero-box__logo {
    font-size: var(--font-s-Mobalh1);
  }

  .hero-box__pidtext {
    font-size: var(--font-s-MobalText);
  }
}


.discountButton {
margin-top: 40px;
}.ttr{
    border: none;
    box-shadow: none;
    background: transparent;
    padding-right: 60px;
}


</style>