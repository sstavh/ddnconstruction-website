<script lang="ts" setup>
import FormСontact from '~/components/ui/FormsComponents/FormСontact.vue';
import ImgsBlocFoto from '~/components/ui/informationBlok/blokImgs/ImgsBlocFoto.vue';
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="form-container__box">
        <h3 class="form-container__title">Зв'яжіться з нами</h3>
        <div class="form-box">
          <FormСontact />
          <ImgsBlocFoto class="tt"  data-aos="fade-left"/>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>

.form-container__title{
  margin-top: 160px;
  text-align: center;
}

.form-box{
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
}

 @media (max-width: 1024px) {
    .form-box{
      display: block;
      margin: 0 auto;
      
    }

    .form-container{
    display: flex;
      justify-content: center;
      gap: 0;   
    }
    .tt{
      
      display: none;    
    }
  }
  
  @media (max-width: 768px) {
    
  }
   @media (max-width: 430px) {
    
   }
</style> 