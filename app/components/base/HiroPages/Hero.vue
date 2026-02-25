<script setup lang="ts">
import Button from '../../ui/Button.vue';
import ImdSwicher from '../../ui/bagFons/ImgSwitcher.vue';
import TypeTextt  from '../../ui/TypedText.vue';
console.log("hiro work");


</script>


<template>
<section>
    <ImdSwicher />
    <div class="container">
        <div class="hiro-container">
            <div class="hero-container__box">
                <h1 class="hero-box__logo">
                      <TypeTextt text="текст слого для компанії з ефектом написаня " />
                </h1>
                <p  data-aos="fade-right" class="hero-box__pidtext">підтекст для розумуня для чого це все і. прощо компанія короткий не велий</p>
                <div data-aos="fade-up" data-aos-duration="10500">
                    <Button />
                </div>
                
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
.hiro-container{
    margin-left: 45px;
    padding-top: 170px;
}

.hero-box__logo {
    font-size: var(--font-s-h1);
    font-family: var(--font-f-Inter);
    max-width: 570px;
    font-weight: 700px;
    margin-bottom: 15px;
}

.hero-box__pidtext{
    font-size: var(--font-s-text);
    color: var( --color-praymeri-blekText);
    max-width: 440px;
    margin-bottom: 15px;
}
</style>