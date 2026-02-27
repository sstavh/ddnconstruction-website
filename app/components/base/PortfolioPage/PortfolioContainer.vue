<script lang="ts" setup>
import CaruselBlok from '../../ui/PortfolioBlok/CaruselBlok.vue';
import PortBlokBigFoto from '../../ui/PortfolioBlok/PortBlokBigFoto.vue';
import PortBlokText from '../../ui/PortfolioBlok/PortBlokText.vue';
import PortBlokTitle from '../../ui/PortfolioBlok/PortBlokTitle.vue';

const colors = [
  "#FF6B6B",
  "#FFD93D",
  "#6BCB77",
  "#4D96FF",
  "#845EC2",
];

const slides = [
  { id: 1, color: "#ff4d4f", title: "Робота", subtitle: "Збір вимог" },
  { id: 2, color: "#ffa940", title: "Робота", subtitle: "Прототипування" },
  { id: 3, color: "#52c41a", title: "Робота", subtitle: "Розробка логіки" },
  { id: 4, color: "#1677ff", title: "Робота", subtitle: "Стилізація" },
  { id: 5, color: "#9254de", title: "Робота", subtitle: "Тестування" },
];
</script>

<template>
<section>
    <div class="container">
        <div class="prot-container">
            <div class="port-container__box">
                <PortBlokTitle class="port-title" order: 1 data-aos="fade-up">
                    Кухні
                </PortBlokTitle>
                <div class="port-box__textFoto">
                    <PortBlokText order: 2  data-aos="fade-right">
                        в цьму блоці має текст бути повязаний з цим блоком <br/><br/>
                        sduhhuidhauihdui
                        <br/><br/>hoifuishfyugsfbnjsfhj. si fsfsuhsfsaikujhauidujaihdg adyuagahb dad oidoi adipadady aydta dad k kcydatyrdat ddh a78 t
                    </PortBlokText>
                    <PortBlokBigFoto data-aos="zoom-in" order: 2 :colors="colors"/>
                </div>
                <CaruselBlok :slides="slides" :autoplay-ms="2500"   />
            </div>
        </div>
    </div>
</section>
</template>
<style scoped>
.prot-container{
    margin-top: 130px;
    margin-bottom: 30px;
}

.port-box__textFoto{
    display: flex;
    gap: 30px;
}

.port-title{
    margin-bottom: 40px;
    margin-left: 70px;
}
</style>