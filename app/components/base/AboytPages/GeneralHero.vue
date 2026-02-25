<script lang="ts" setup>
import Button from "../../ui/Button.vue";
</script>

<template>
    <div class="container">
        <div class="general-container">
            <div class="general-container__box">
                <div data-aos="fade-right" order: 2 class="foto-test">IMGS</div>
                <div class="generel-box">
                    <h1 class="generel-box__title">Текст слого для <br/>цієї сторінки</h1>
                    <p class="generel-box__pidtext">текст для доповнненя</p>
                    <Button order: 2 data-aos="fade-up"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
}

.generel-box__pidtext{
    padding:  20px 0px 20px 0px;
    font-size: --font-s-textSmoll;
    color: var(--color-praymeri-blekText);
}
</style>