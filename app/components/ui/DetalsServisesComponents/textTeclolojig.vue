<script lang="ts" setup>
import Button from '../Button.vue';

const props = defineProps<{
  title: string
  text: string
  buttonLink?: string
  buttonText?: string
}>()
</script>

<template>
    <section>
        <div class="container">
            <div class="textTec-container">
                <h3 data-aos="fade-up" class="textTec-container__title">
                    {{ title }}
                </h3>

                <div class="textTec-container__box">
                    <p class="textTec-box__text" v-html="text">
                    </p>

                    <Button :link="buttonLink" :text="buttonText" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.textTec-container__title{
    text-align: center;
    margin-top: 120px;
    margin-bottom: 50px;
}

.textTec-box__text{
    margin-bottom: 40px;
}

@media (max-width: 1024px) {
  .textTec-container__title {
    margin-top: 80px;
    margin-bottom: 36px;
  }
}

@media (max-width: 768px) {
  .textTec-container__title {
    margin-top: 60px;
    margin-bottom: 28px;
    font-size: 28px;
  }
  .textTec-box__text {
    margin-bottom: 28px;
    font-size: 15px;
    line-height: 1.7;
  }
}

@media (max-width: 430px) {
  .textTec-container__title {
    margin-top: 48px;
    margin-bottom: 20px;
    font-size: var(--font-s-Mobalh1, 22px);
  }
  .textTec-box__text {
    font-size: 14px;
    margin-bottom: 20px;
  }
}
</style>
