<script setup lang="ts">
import FotosPortaolio from '~/components/ui/FotosPortaolio.vue'
import ButtonNextPort from '~/components/ui/ButtonNextPort.vue';
</script>

<template>
     <section>
       
            <div class="portfiliosec-container">
                <div class="portfoliosec-container__box">
                    <h2 class="portfoliosec-box__logo">Портфоліо</h2>
                    <div class="box-galeri">
                        <ul class="box-galeri__list">
                            <li class="box-galeri__item">
    <FotosPortaolio
      text="Текст з’являється на hover або рандомно на 6с"
      :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
      :cycle-seconds="25"
      :random-min-wait-seconds="2"
      :random-max-wait-seconds="5"
      :random-show-seconds="40"
    />
  </li>
                        </ul>
                        <ul>
                        <li class="box-galeri__item">
         <FotosPortaolio
      text="Текст з’являється на hover або рандомно на 6с"
      :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
      :cycle-seconds="25"
      :random-min-wait-seconds="5"
      :random-max-wait-seconds="10"
      :random-show-seconds="15"
    />
</li>
                        </ul>
                        <ul>
                            <li class="box-galeri__item">
    <FotosPortaolio
      text="Текст з’являється на hover або рандомно на 6с"
      :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
      :cycle-seconds="25"
      :random-min-wait-seconds="5"
      :random-max-wait-seconds="7"
      :random-show-seconds="8"
    /></li>
                        </ul>

                        <div class="box-galeri__button">
                            <ButtonNextPort />
                        </div>
                    </div>
                </div>
            </div>
        
    </section>
</template>


<style scoped>
.portfoliosec-container__box{
 background-color: var(--color-praymeri-blue);
    padding-top: 30px;
    padding-bottom: 50px;
}


.portfoliosec-box__logo{
text-align: center;
color: var(--color-praymeri-blek);
font-size: var( --font-s-title);
}

.box-galeri{
    display: flex;  
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
   
}

.box-galeri__item{
      list-style: none;
}
</style>