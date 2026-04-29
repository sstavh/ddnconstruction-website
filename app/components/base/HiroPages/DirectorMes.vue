<script setup lang="ts">
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
import { imgUrl } from '~/composables/useApi'

const apiUrl = useRuntimeConfig().public.apiUrl

const { data: imgData } = useFetch<any[]>(
  `${apiUrl}/section-images/section/directorMes`,
  { key: 'directorMesImg', getCachedData: () => undefined },
)

const directorImgUrl = computed(() => {
  const d = imgData.value
  return Array.isArray(d) && d.length > 0 ? imgUrl(d[0].imageUrl) : ''
})
</script>

<template>
<section>
    <div class="container">
        <div class="directorMes-container">
             <h3 class="directorMes-box__logo">Слова Директора</h3>
            <div class="directorMes-box">
               <div data-aos="fade-up-right">
                <div data-aos="zoom-out-right" class="img-cont">
                  <img v-if="directorImgUrl" :src="directorImgUrl" alt="Директор" class="director-img" />
                </div>
               </div>

                <div class="directorMes-box__container">
                    <p class="directorMes-box__text">Тут може бути текст, який буде відображатися у розділі "Слова Директора".</p>
                    <Button ext="Button"
  link="/catalog"/>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
.directorMes-container{
    padding-top: 180px;
    padding-bottom: 30px;
}

.directorMes-box{
    display: flex;
    gap: 30px;
    margin: 0 auto;
    align-items: center;
}

.directorMes-box__logo{
    text-align: center;
    margin-bottom: 55px;
}

.img-cont{
    height: 500px;
    width: 430px;
    background-color: #1e293b;
    margin-right: 55px;
    overflow: hidden;
}

.director-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.directorMes-box__text{
    padding-bottom: 25px;
}

 @media (max-width: 1024px) {
    .directorMes-box__logo{
        margin-top: 120px;
    }
 }

   @media (max-width: 768px) {
    .directorMes-box{
        display: block;
    }
   }

      @media (max-width: 430px) {
        .img-cont{
            width: 100%;
            height: 390px;
            margin-bottom: 25px;
        }
      }
</style>
