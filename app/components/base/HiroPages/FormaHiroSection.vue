<script lang="ts" setup>
import FormСontact from '~/components/ui/FormsComponents/FormСontact.vue';
import ImgsBlocFoto from '~/components/ui/informationBlok/blokImgs/ImgsBlocFoto.vue';
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="form-container__box">
        <h2 class="form-container__title">Зв'яжіться з нами</h2>
        <div class="form-box">
          <FormСontact />
          <ImgsBlocFoto />
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>

.form-container__title{
  margin-top: 60px;
  margin-bottom: -35px;
  font-size: var(--font-s-title);
  text-align: center;

}

.form-box{
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;

}
</style>