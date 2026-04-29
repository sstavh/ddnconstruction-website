<script lang="ts" setup>
import CaruselBlok from '../../ui/PortfolioBlok/CaruselBlok.vue';
import PortBlokBigFoto from '../../ui/PortfolioBlok/PortBlokBigFoto.vue';
import PortBlokText from '../../ui/PortfolioBlok/PortBlokText.vue';
import PortBlokTitle from '../../ui/PortfolioBlok/PortBlokTitle.vue';

const props = withDefaults(defineProps<{
  title?: string
  text?: string
  serviceSlug?: string
  slides?: { id: number | string; color?: string; imageUrl?: string; title: string; subtitle: string }[]
}>(), {
  title: 'Kitchen Service',
  text: 'Опишіть цей розділ тут. Кожен блок має свій власний текст.',
})

const defaultSlides = [
  { id: 1, color: "#ff4d4f", title: "Робота", subtitle: "Збір вимог" },
  { id: 2, color: "#ffa940", title: "Робота", subtitle: "Прототипування" },
  { id: 3, color: "#52c41a", title: "Робота", subtitle: "Розробка логіки" },
  { id: 4, color: "#1677ff", title: "Робота", subtitle: "Стилізація" },
  { id: 5, color: "#9254de", title: "Робота", subtitle: "Тестування" },
]

const activeSlides = props.slides || defaultSlides

const bigFotoSections = props.serviceSlug
  ? [`${props.serviceSlug}Photo1`, `${props.serviceSlug}Photo2`, `${props.serviceSlug}Photo3`]
  : []

const defaultColors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#845EC2"]
</script>

<template>
<section>
    <div class="container">
        <div class="prot-container">
            <div class="port-container__box">
                <PortBlokTitle class="port-title" data-aos="fade-up">
                    {{ title }}
                </PortBlokTitle>
                <div class="port-box__textFoto">
                    <PortBlokText data-aos="fade-right">
                        {{ text }}
                    </PortBlokText>
                    <PortBlokBigFoto
                      data-aos="zoom-in"
                      :sections="bigFotoSections.length ? bigFotoSections : undefined"
                      :colors="defaultColors"
                    />
                </div>
                <CaruselBlok :slides="activeSlides" :autoplay-ms="2500" />
            </div>
        </div>
    </div>
</section>
</template>
<style scoped>


/* SECTION */
.prot-container {
  margin-top: 130px;
  margin-bottom: 60px;
}

/* TITLE */
.port-title {
  margin-bottom: 40px;
  margin-left: 70px;
}

/* MAIN ROW */
.port-box__textFoto {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* ===================== */
/* 💻 TABLET */
/* ===================== */
@media (max-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .port-box__textFoto {
    gap: 20px;
  }

  .port-title {
    margin-left: 20px;
  }
}

/* ===================== */
/* 📱 MOBILE */
/* ===================== */
@media (max-width: 768px) {
  .container {
    max-width: 720px;
  }

  .prot-container {
    margin-top: 80px;
  }

  /* 🔥 ГОЛОВНЕ */
  .port-box__textFoto {
    flex-direction: column;
    gap: 24px;
  }

  /* щоб блоки не були вузькі */
  .port-box__textFoto > * {
    width: 100%;
  }

  .port-title {
    margin-left: 0;
    text-align: center;
  }
}

/* ===================== */
/* 📱 SMALL MOBILE */
/* ===================== */
@media (max-width: 430px) {
  .container {
    max-width: 360px;
  }

  .prot-container {
    margin-top: 60px;
  }

  .port-box__textFoto {
    gap: 18px;
  }

  .port-title {
    margin-bottom: 24px;
  }

  /* текст трохи компактніший */
  .port-box__textFoto p {
    font-size: var(--font-s-MobalText);
  }
}
</style>