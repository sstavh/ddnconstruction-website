<script setup lang="ts">
import PromoCard from '../../ui/ServisesComponents/PromoCard.vue'
import BeforeAfter from '../../ui/informationBlok/beforeAfter.vue';
import TextBlok from '../../ui/informationBlok/TextBlok.vue';

</script>

<template>
    <section>
        <div class="container">
            <div class="collected-contaoner">
                <h3 class="collected-title">
                    Вибирай що тобі потрібно
                </h3>

                <div class="collected-box">
                     <PromoCard
  logo="/logos/spotify.svg"
  color="#1db954"
  width="380px"
  height="450px"
  bg-image="/images/music.jpg"
  link="/music"
  button-text="Перейти"
/>
<BeforeAfter/>
<PromoCard
  logo="/logos/spotify.svg"
  color="#1db954"
  width="380px"
  height="450px"
  bg-image="/images/music.jpg"
  link="/music"
  button-text="Перейти"
/>
<PromoCard
  logo="/logos/spotify.svg"
  color="#1db954"
  width="380px"
  height="450px"
  bg-image="/images/music.jpg"
  link="/music"
  button-text="Перейти"
/>
<PromoCard
  logo="/logos/spotify.svg"
  color="#1db954"
  width="380px"
  height="450px"
  bg-image="/images/music.jpg"
  link="/music"
  button-text="Перейти"
/>
<TextBlok
    text="Це текст із головного файлу. Тут ти можеш писати будь-який опис для інформаційного блока."
  />
  <PromoCard
  logo="/logos/spotify.svg"
  color="#1db954"
  width="380px"
  height="450px"
  bg-image="/images/music.jpg"
  link="/music"
  button-text="Перейти"
/>
<PromoCard
  logo="/logos/spotify.svg"
  color="#1db954"
  width="380px"
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

<style scoped></style>