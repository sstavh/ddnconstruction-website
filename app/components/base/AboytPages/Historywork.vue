<script lang="ts" setup>
import { ref, onMounted } from "vue";

const apiUrl = useRuntimeConfig().public.apiUrl

const img1 = ref('')
const img2 = ref('')
const img3 = ref('')

async function loadImg(section: string): Promise<string> {
  try {
    const res = await fetch(`${apiUrl}/section-images/section/${section}`)
    const data = await res.json()
    if (data && data.length > 0) return `${apiUrl}/${data[0].imageUrl}`
  } catch { /* fallback to lime block */ }
  return ''
}

onMounted(async () => {
  [img1.value, img2.value, img3.value] = await Promise.all([
    loadImg('historyWork1'),
    loadImg('historyWork2'),
    loadImg('historyWork3'),
  ])
})
</script>

<template>
  <section>
    <div class="container">
      <div class="historyWork-container">
        <div class="historyWork-container__box">
          <h3 data-aos="fade-up" class="historyWork-box__title">How It Started</h3>

          <ul class="historyWork-ul">
            <li class="historyWork-ul__li">
              <div
                data-aos="fade-right"
                class="work-block"
                :style="img1 ? { backgroundImage: 'url(' + img1 + ')' } : {}"
              ></div>
              <div class="historyWork-li__box">
                <h4 data-aos="fade-up" class="historyWork-li">Our Beginning</h4>
                <p class="historyWork-li__text">We started with small projects and a simple goal — do quality work and do it right.</p>
              </div>
            </li>

            <li class="historyWork-ul__li">
              <div class="historyWork-li__box">
                <h4 data-aos="fade-up" class="historyWork-li">Growth & Experience</h4>
                <p class="historyWork-li__text">We took on more projects, improved our processes, and earned the trust of our clients.</p>
              </div>
              <div
                data-aos="fade-left"
                class="work-block tt"
                :style="img2 ? { backgroundImage: 'url(' + img2 + ')' } : {}"
              ></div>
            </li>

            <li class="historyWork-ul__li">
              <div
                data-aos="fade-right"
                class="work-block"
                :style="img3 ? { backgroundImage: 'url(' + img3 + ')' } : {}"
              ></div>
              <div class="historyWork-li__box">
                <h4 data-aos="fade-up" class="historyWork-li">Stability & Result</h4>
                <p class="historyWork-li__text">Today, we're proud to be a trusted team delivering reliable, high-quality remodeling for every client.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding-bottom: 80px;
}

.historyWork-container {
  margin-top: 160px;
}

.historyWork-box__title {
  margin-bottom: 60px;
  text-align: center;
}

.historyWork-ul {
  list-style: none;
}

.historyWork-ul__li {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 120px;
  gap: 30px;
}

.work-block {
  flex-shrink: 0;
  background-color: chartreuse;
  background-size: cover;
  background-position: center;
  width: 500px;
  height: 370px;
  margin-right: 80px;
  border-radius: 12px;
}

.tt {
  margin-right: 0;
  margin-left: 90px;
}

.historyWork-li__box {
  margin-top: 100px;
}

.historyWork-li {
  margin-bottom: 15px;
}

.historyWork-li__text {
  font-size: var(--font-s-navigation);
}

@media (max-width: 768px) {
  .historyWork-ul__li {
    gap: 10px;
  }

  .tt {
    margin-left: 20px;
  }

  .historyWork-li {
    font-size: var(--font-s-Mobalh4);
    font-weight: var(--font-w-h3);
  }
}

@media (max-width: 430px) {
  .historyWork-ul__li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 80px;
  }

  .work-block {
    order: 1;
    width: 100%;
    max-width: 340px;
    height: 220px;
    margin: 0;
    border-radius: 10px;
  }

  .tt {
    margin: 0;
  }

  .historyWork-li__box {
    order: 2;
    margin-top: 0;
    text-align: center;
  }

  .historyWork-li {
    margin-bottom: 6px;
    font-size: var(--font-s-Mobalh4);
  }

  .historyWork-li__text {
    font-size: var(--font-s-MobalText);
  }
}
</style>
