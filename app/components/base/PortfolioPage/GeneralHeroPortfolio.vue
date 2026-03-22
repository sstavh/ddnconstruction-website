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
                    <Button ext="Button"
  link="/catalog" order: 2 data-aos="fade-up"/>
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