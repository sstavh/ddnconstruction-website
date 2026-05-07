<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { CSSProperties } from "vue";
import { imgUrl, fetchSection } from '~/composables/useApi'

/* ====== НАЛАШТУВАННЯ ====== */
const PIN_TOP = 80;                 // відступ під хедер
const SCROLL_PER_CARD_VH = 80;      // скрол на 1 додаткову картку
const EXIT_EXTRA_VH = 40;           // простір для виходу
const STACK_X = 150;
const STACK_Y = 100;

const backgroundImage = ref('')
const defaultBg = '/images/ourProcess/bg.jpg'

const cards = ref([
  { id: "c1", section: "ourProcess1", title: "Consultation & Estimate", text: "We discuss your project, evaluate the scope of work , and provide a clear and accurate estimate.", imageUrl: "" },
  { id: "c2", section: "ourProcess2", title: "Planning & Preparation", text: "We create a detailed work plan, set timelines, and help you select the right materials.", imageUrl: "" },
  { id: "c3", section: "ourProcess3", title: "Build & Final Delivery", text: "We complete your project with precision and deliver a high-quality finished result on time. ", imageUrl: "" },
]);

async function fetchBackground() {
  try {
    const data = await fetchSection('ourProcess')
    if (data && data.length > 0) {
      backgroundImage.value = imgUrl(data[0].imageUrl)
    } else {
      backgroundImage.value = defaultBg
    }
  } catch (error) {
    console.error('Error fetching background:', error)
    backgroundImage.value = defaultBg
  }
}

async function fetchCardImages() {
  for (const card of cards.value) {
    try {
      const data = await fetchSection(card.section)
      if (data && data.length > 0) {
        card.imageUrl = imgUrl(data[0].imageUrl)
      }
    } catch (e) {}
  }
}

// Звідки "прилітає" кожна картка
// 1-ша центральна: без прильоту (стоїть)
const flyFrom = [
  { x: 0, y: 0 },        // c1 — центральна, не рухаємо
  { x: -280, y: 0 },     // c2 — зліва
  { x: 280, y: 0 },      // c3 — справа
  // якщо додаси ще картки:
  // { x: 0, y: 220 },   // знизу
  // { x: 0, y: -220 },  // зверху
];

const sectionEl = ref<HTMLElement | null>(null);

// ВАЖЛИВО: тепер тримаємо ПОТОЧНИЙ прогрес, а не max
const progress = ref(0);
let raf = 0;

const sectionHeight = ref(0);

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function recalcSectionHeight() {
  const vh = Math.max(window.innerHeight, 1);
  const usableVh = Math.max(1, vh - PIN_TOP);

  const perCard = (SCROLL_PER_CARD_VH / 100) * vh;

  const total =
    usableVh +
    perCard * Math.max(0, cards.value.length - 1) +
    (EXIT_EXTRA_VH / 100) * vh;

  sectionHeight.value = Math.round(total);
}

function update() {
  const sec = sectionEl.value;
  if (!sec) return;

  const vh = Math.max(window.innerHeight, 1);
  const usableVh = Math.max(1, vh - PIN_TOP);

  const topAbs = sec.getBoundingClientRect().top + window.scrollY;

  const start = topAbs;
  const end = topAbs + sec.offsetHeight - usableVh;

  const denom = Math.max(1, end - start);
  const p = clamp01((window.scrollY + PIN_TOP - start) / denom);

  progress.value = p;
}

function onScroll() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(update);
}

onMounted(async () => {
  await Promise.all([fetchBackground(), fetchCardImages()])
  recalcSectionHeight();
  update();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      recalcSectionHeight();
      onScroll();
    },
    { passive: true }
  );
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  cancelAnimationFrame(raf);
});

function segmentProgress(i: number) {
  // 1-ша картка завжди видима
  if (i === 0) return 1;

  // сегменти для 2..N
  const totalRevealCards = Math.max(1, cards.value.length - 1);
  const idx = i - 1;

  const start = idx / totalRevealCards;
  const end = (idx + 1) / totalRevealCards;

  return clamp01((progress.value - start) / (end - start));
}

function cardStyle(i: number): CSSProperties {
  const t = easeOutCubic(segmentProgress(i));

  // стек
  const xStack = i * STACK_X;
  const yStack = i * STACK_Y;

  // прильот з різних сторін
  const dir = flyFrom[i] ?? { x: 0, y: 220 };
  const xFly = (1 - t) * dir.x;
  const yFly = (1 - t) * dir.y;

  const scale = i === 0 ? 1 : (0.97 + 0.03 * t);

  // 1-ша центральна НЕ пропадає
  const opacity = i === 0 ? 1 : t;

  // 1-ша без fly
  const tx = i === 0 ? xStack : (xStack + xFly);
  const ty = i === 0 ? yStack : (yStack + yFly);

  const imageStyle = cards.value[i]?.imageUrl
    ? { backgroundImage: `url(${cards.value[i].imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}

  return {
    transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${scale})`,
    opacity,
    zIndex: 10 + i,
    pointerEvents: opacity > 0.98 ? "auto" : "none",
    ...imageStyle,
  };
}
</script>

<template>
  <section 
    ref="sectionEl" 
    class="stackSection" 
    :style="{ 
      height: sectionHeight + 'px',
      backgroundImage: `url(${backgroundImage})`
    }"
  >
    <div class="overlay"></div>
    <h3 class="our-title">Our Process</h3>
    <div class="pin">
      <div class="content">
        

        <div class="stage">
          <article
            v-for="(c, i) in cards"
            :key="c.id"
            class="card"
            :style="cardStyle(i)"
          >
            <h4 class="cardTitle">{{ c.title }}</h4>
            <p class="cardText">{{ c.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stackSection {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.our-title {
  position: relative;
  z-index: 2;
}

.pin {
  position: sticky;
  top: 50px; 
  height: calc(100vh - 100px);
  z-index: 50;
}

.content {
  width: min(700px, calc(100% - 32px));
  margin-left: 17%;
  height: 100%;
  padding-top: 12px;
}

.our-title{ 
    align-items: center;
    justify-content: center;
    display: flex;                                                     ;
    margin-top: 300px;
    margin-bottom: -100px;
}
.stage {
  position: relative;
  height: calc(100% - 44px);
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;

  width: min(860px, calc(100% - 24px));
  min-height: 380px ;
  padding: 28px;
  width: 750px;

  border-radius: 14px;
  background: rgb(90, 123, 88);
  border: 4px solid #070707;
  box-sizing: border-box;

  will-change: transform, opacity;
}

.cardTitle {
  margin: 0 0 10px;
  color: var(--color-praymeri-light);
}

.cardText {
  position: absolute;
  bottom: 0;
  line-height: 1.55;
  opacity: 0.95;
  color: var(--color-praymeri-light);
}

@media (max-width: 1024px) {
  .stackSection{
    display: none;
  }
}


</style>