<script lang="ts" setup>
import Button from '../Button.vue';

const props = defineProps<{
  title: string
  text: string
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
                    <p class="textTec-box__text">
                        {{ text }}
                    </p>

                    <Button/>
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
</style>
