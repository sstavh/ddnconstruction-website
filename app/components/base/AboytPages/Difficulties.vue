<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { imgUrl } from '~/composables/useApi'

const apiUrl = useRuntimeConfig().public.apiUrl

const backgroundImage = ref('')
const defaultBg = '/images/about/difficulties.jpg'
type Worker = { image: string; name: string; specialty: string }
const workers = ref<[Worker, Worker, Worker]>([
  { image: '', name: '', specialty: '' },
  { image: '', name: '', specialty: '' },
  { image: '', name: '', specialty: '' },
])

async function fetchBackground() {
  try {
    const response = await fetch(`${apiUrl}/section-images/section/difficulties`)
    const data = await response.json()
    backgroundImage.value = data?.length > 0 ? imgUrl(data[0].imageUrl) : defaultBg
  } catch {
    backgroundImage.value = defaultBg
  }
}

async function fetchWorker(slot: number, section: string) {
  try {
    const response = await fetch(`${apiUrl}/section-images/section/${section}`)
    const data = await response.json()
    if (data?.length > 0) {
      workers.value[slot] = {
        image: imgUrl(data[0].imageUrl),
        name: data[0].title || '',
        specialty: data[0].description || '',
      }
    }
  } catch {}
}

const { data: workersFlagData } = useFetch<any[]>(
  `${apiUrl}/section-images/section/difficultiesWorkersVisible`,
  { key: 'difficultiesWorkersVisible', getCachedData: () => undefined },
)

const workersVisible = computed(() => {
  const d = workersFlagData.value
  return !(Array.isArray(d) && d.length > 0 && d[0].title === '0')
})

onMounted(async () => {
  await Promise.all([
    fetchBackground(),
    fetchWorker(0, 'difficulties1'),
    fetchWorker(1, 'difficulties2'),
    fetchWorker(2, 'difficulties3'),
  ])
})
</script>

<template>
    <section :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="overlay"></div>
        <div class="container">
            <div class="diffic-container">
                <div class="diffic-container__box">
                    <h3 data-aos="fade-up" order: 1 class="diffic-box__tile">Трудності в роботі</h3>
                    <p class="diffic-box__pidtext">текст досить опширний і з хороши змістом і роботою агігаішгапінанімаіпам іп гапінап іап інамііма вшф8нвф98 вфва фвфв вф8 вшрвгфрв фрв ф8вн фвнрв гшфрвгшвфшгвфгв фав фнвп гірв ф78вф98в ф98вфврфв мимфрпвф </p>

                   <ul v-if="workersVisible" class="diffic-box__ul">
                        <li data-aos="fade-right" class="diffic-ul__li">
                            <div
                              class="test-img"
                              :style="workers[0].image ? { backgroundImage: `url(${workers[0].image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
                            ></div>
                            <h4>{{ workers[0].name || 'Імя прізвище' }}</h4>
                            <p class="diffic-li-text">{{ workers[0].specialty || 'коротка спеціальність' }}</p>
                        </li>
                        <li data-aos="fade-up" class="diffic-ul__li">
                            <div
                              class="test-img"
                              :style="workers[1].image ? { backgroundImage: `url(${workers[1].image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
                            ></div>
                            <h4>{{ workers[1].name || 'Імя прізвище' }}</h4>
                            <p class="diffic-li-text">{{ workers[1].specialty || 'коротка спеціальність' }}</p>
                        </li>
                        <li data-aos="fade-down" class="diffic-ul__li tt">
                            <div
                              class="test-img"
                              :style="workers[2].image ? { backgroundImage: `url(${workers[2].image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
                            ></div>
                            <h4>{{ workers[2].name || 'Імя прізвище' }}</h4>
                            <p class="diffic-li-text">{{ workers[2].specialty || 'коротка спеціальність' }}</p>
                        </li>
                    </ul> 
                </div> 
            </div>
        </div>
    </section>
</template>
<style scoped>
section {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    padding-bottom: 80px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    z-index: 1;
}

section .container {
    position: relative;
    z-index: 2;
}

/* ====== BASE (твій, без змін) ====== */
.diffic-container{
    margin-top: 160px;
}

.diffic-box__tile{
    text-align: center;
    margin-bottom: 50px;
}

.diffic-box__pidtext{
    padding-left: 5%;
    padding-right: 5%;
    text-align: center;
    margin-bottom: 100px;
}

.diffic-box__ul{
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    list-style: none;
    gap: 30px;
}

.diffic-ul__li{
    margin-right: 80px;
}

.tt{
    margin-right: 0;
}

.test-img{
    background-color: brown;
    width: 270px;
    height: 350px;
    margin-bottom: 25px;
}

.diffic-li-text{
    margin-top: 5px;
    color: var(--color-praymeri-blekText);
    font-size: var(--font-s-navigation);
}


/* ====== 1024px ====== */
@media (max-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .diffic-container {
    margin-top: 120px;
  }

  .diffic-box__ul {
    gap: 20px;
  }

  .diffic-ul__li {
    margin-right: 40px;
  }

  .test-img {
    width: 220px;
    height: 300px;
  }
}


/* ====== 768px ====== */
@media (max-width: 768px) {
  .container {
    max-width: 720px;
  }

  .diffic-box__ul {
    flex-wrap: wrap;
    gap: 20px;
  }

  .diffic-ul__li {
    margin-right: 0;
    width: calc(50% - 10px);
  }

  .test-img {
    width: 100%;
    height: 260px;
  }

  .diffic-box__pidtext {
    margin-bottom: 60px;
  }
}


/* ====== 430px ====== */
@media (max-width: 430px) {
  .container {
    max-width: 360px;
  }

  .diffic-container {
    margin-top: 80px;
  }

  .diffic-box__ul {
    flex-direction: column;
    gap: 25px;
  }

  .diffic-ul__li {
    width: 100%;
  }

  .test-img {
    height: 220px;
  }

  .diffic-box__tile {
    margin-bottom: 30px;
  }

  .diffic-box__pidtext {
    margin-bottom: 40px;
  }

  p {
    font-size: var(--font-s-MobalText);
  }
}</style>


