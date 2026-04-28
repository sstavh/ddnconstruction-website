<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PromoCard from '../../ui/ServisesComponents/PromoCard.vue'
import BeforeAfter from '../../ui/informationBlok/beforeAfter.vue';
import TextBlok from '../../ui/informationBlok/TextBlok.vue';
import { imgUrl, fetchSection } from '~/composables/useApi'

const imgs = ref<{ imageUrl: string }[]>([])

function img(index: number): string {
  return imgs.value[index]?.imageUrl || ''
}

async function fetchImages() {
  try {
    const data = await fetchSection('collectedServices')
    if (Array.isArray(data)) {
      imgs.value = data.map((item: { imageUrl: string }) => ({ imageUrl: imgUrl(item.imageUrl) }))
    }
  } catch (e) {}
}

onMounted(fetchImages)
</script>

<template>
    <section>
        <div class="container">
            <div class="collected-contaoner">
                <h3 class="collected-title">
                    Вибирай що тобі потрібно
                </h3>

                <div class="collected-box">

                     <PromoCard class="aa"
                     data-aos="fade-up" order:1
                      logo="/logos/spotify.svg"
                      width="292.5px"
                      height="400px"
                      :bg-image="img(0)"
                      link="/music"
                      button-text="Перейти"
                    />
                    <BeforeAfter data-aos="fade-up" order:1 class="ttt"/>
                    <PromoCard
                    data-aos="fade-up" order:1
                      logo="/logos/spotify.svg"
                      width="292.5px"
                      height="400px"
                      :bg-image="img(1)"
                      link="/music"
                      button-text="Перейти"
                    />
                    <PromoCard
                    data-aos="fade-up" order:2
                      logo="/logos/spotify.svg"
                      width="380px"
                      height="370px"
                      :bg-image="img(2)"
                      link="/music"
                      button-text="Перейти"
                    />
                    <PromoCard
                     data-aos="fade-up" order:2
                      logo="/logos/spotify.svg"
                      width="370px"
                      height="370px"
                      :bg-image="img(3)"
                      link="/music"
                      button-text="Перейти"
                    />
                    <TextBlok class="ttt-text"
                     data-aos="fade-up" order:2
                        text="Це текст із головного файлу. Тут ти можеш писати будь-який опис для інформаційного блока."
                      />
                      <PromoCard
                       data-aos="fade-up" order:3
                      logo="/logos/spotify.svg"
                      width="575px"
                      height="450px"
                      :bg-image="img(4)"
                      link="/music"
                      button-text="Перейти"
                    />
                    <PromoCard
                     data-aos="fade-up" order:3
                      logo="/logos/spotify.svg"
                      width="575px"
                      height="450px"
                      :bg-image="img(5)"
                      link="/music"
                      button-text="Перейти"
                    />

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

/* ====== BASE ====== */
.collected-contaoner{
    margin-top: 130px;
}

.collected-title{
    text-align: center;
    margin-bottom: 100px;
}

.collected-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 150px;
}

/* великі кастомні блоки */
.ttt{
    width: 530px;
    height: 400px;
}

.ttt-text{
    width: 370px;
    height: 370px;
}


/* ====== 1024px ====== */
@media (max-width: 1024px) {

    .ttt-text{
        height: 450px;
    }
  .container {
    max-width: 960px;
  }

  .collected-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    align-items: stretch;
  }

  /* всі елементи займають всю ширину колонки */
  .collected-box > * {
    width: 100% !important;
  }

  /* 🔥 ПЕРШИЙ ВЕЛИКИЙ БЛОК РОЗТЯГУЄМО */
  .collected-box > :first-child {
    grid-column: span 2;
    width: 100% !important;
  }

  /* текстовий блок теж акуратно центруємо */
  .ttt-text {
    width: 100% !important;
  }
}


/* ====== 768px ====== */
@media (max-width: 768px) {
  .container {
    max-width: 720px;
  }

  .collected-box {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  /* великий блок все ще на всю ширину */
  .collected-box > :first-child {
    grid-column: span 2;
  }
}


/* ====== 430px ====== */
@media (max-width: 430px) {
  .container {
    max-width: 360px;
  }

  .collected-contaoner{
    margin-top: 70px;
  }

  .collected-title{
    margin-bottom: 40px;
  }

  .collected-box {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 80px;
  }

  /* все в одну колонку */
  .collected-box > * {
    width: 100% !important;
  }

  /* великий блок також не ламає сітку */
  .collected-box > :first-child {
    grid-column: span 1;
  }
}
</style>