<script setup lang="ts">
import PromoCard from '../../ui/ServisesComponents/PromoCard.vue'
import BeforeAfter from '../../ui/informationBlok/beforeAfter.vue';
import TextBlok from '../../ui/informationBlok/TextBlok.vue';

</script>

<template>
    <section>
        <div class="container">
            <div class="collected-contaoner">
                <h3 class="collected-title"
                 >
                    Вибирай що тобі потрібно
                </h3>

                <div class="collected-box">
                    
                     <PromoCard

                     data-aos="fade-up" order: 1
                      logo="/logos/spotify.svg"
                      color="#1db954"
                      width="292.5px"
                      height="400px"
                      bg-image="/images/music.jpg"
                      link="/music"
                      button-text="Перейти"
                    />
                    <BeforeAfter data-aos="fade-up" order: 1 class="ttt"/>
                    <PromoCard
                    data-aos="fade-up" order: 1
                      logo="/logos/spotify.svg"
                      color="#1db954"
                      width="292.5px"
                      height="400px"
                      bg-image="/images/music.jpg"
                      link="/music"
                      button-text="Перейти"
                    />
                    <PromoCard
                    data-aos="fade-up" order: 2
                      logo="/logos/spotify.svg"
                      color="#1db954"
                      width="380px"
                      height="370px"
                      bg-image="/images/music.jpg"
                      link="/music"
                      button-text="Перейти"
                    />
                    <PromoCard
                     data-aos="fade-up" order: 2
                      logo="/logos/spotify.svg"
                      color="#1db954"
                      width="370px"
                      height="370px"
                      bg-image="/images/music.jpg"
                      link="/music"
                      button-text="Перейти"
                    />
                    <TextBlok class="ttt-text"
                     data-aos="fade-up" order: 2
                        text="Це текст із головного файлу. Тут ти можеш писати будь-який опис для інформаційного блока."
                      />
                      <PromoCard
                       data-aos="fade-up" order: 3
                      logo="/logos/spotify.svg"
                      color="#1db954"
                      width="575px"
                      height="450px"
                      bg-image="/images/music.jpg"
                      link="/music"
                      button-text="Перейти"
                    />
                    <PromoCard
                     data-aos="fade-up" order: 3
                      logo="/logos/spotify.svg"
                      color="#1db954"
                      width="575px"
                      height="450px"
                      bg-image="/images/music.jpg"
                      link="/music"
                      button-text="Перейти"
                    />

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

.collected-contaoner{
    margin-top: 130px;
}

.collected-title{
    text-align: center;
    margin-bottom: 100px;
}

.collected-box{
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 150px;
}

.ttt{
    width: 530px;
    height: 400px;
}

.ttt-text{
    width: 370px;
    height: 370px;
}
</style>