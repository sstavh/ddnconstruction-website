<script setup lang="ts">
import FotosPortaolio from '~/components/ui/FotosPortaolio.vue'
import ButtonNextPort from '~/components/ui/ButtonNextPort.vue';
</script>

<template>
     <section>
       
            <div class="portfiliosec-container">
                <div class="portfoliosec-container__box">
                    <h3 class="portfoliosec-box__logo">Портфоліо</h3>
                    <div class="box-galeri">
                        <ul class="box-galeri__list">
                            <li class="box-galeri__item"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                            data-aos-delay="0">
                            <FotosPortaolio
                              text="Текст з’являється на hover або рандомно на 6с"
                              :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
                              :cycle-seconds="25"
                              :random-min-wait-seconds="2"
                              :random-max-wait-seconds="5"
                              :random-show-seconds="40"
                            />
                            </li>
                            <li class="box-galeri__item"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                              data-aos-delay="400">
                            <FotosPortaolio
                            text="Текст з’являється на hover або рандомно на 6с"
                            :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
                            :cycle-seconds="25"
                            :random-min-wait-seconds="5"
                            :random-max-wait-seconds="10"
                            :random-show-seconds="15"
                            />
                            </li>   
                            <li class="box-galeri__item"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                            data-aos-delay="800"
                            >
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
                            <div data-aos="fade-up"
                             data-aos-duration="1500"
                            data-aos-delay="1200">
                                 <ButtonNextPort />
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        
    </section>
</template>


<style scoped>
.portfoliosec-container__box{
 background-color: var(--color-seconadry-blueBg);
    padding-top: 30px;
    padding-bottom: 50px;
    margin-bottom: 10px;
}


.box-galeri__list{
    display: flex;
    gap: 20px;
    margin-bottom: 45px;
}

.portfoliosec-box__logo{
text-align: center;
color: var(--color-praymeri-light);

margin-bottom: 20px;
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