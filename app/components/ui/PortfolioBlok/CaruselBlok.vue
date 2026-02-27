<template>
  <section class="carousel" @mouseenter="pause" @mouseleave="resume">
    <button class="nav left" type="button" @click="prev" aria-label="Назад">&lt;</button>

    <div class="viewport">
      <div class="track" :style="trackStyle" @transitionend="onTransitionEnd">
        <!-- Лівий клон -->
        <div v-if="leftClone" class="card">
          <div class="cardInner" :style="{ background: leftClone.color }">
            <div class="overlay">
              <h3 class="title">{{ leftClone.title }}</h3>
              <p class="subtitle">{{ leftClone.subtitle }}</p>
            </div>
          </div>
        </div>

        <!-- Реальні елементи -->
        <div v-for="s in items" :key="s.id" class="card">
          <div class="cardInner" :style="{ background: s.color }">
            <div class="overlay">
              <h3 class="title">{{ s.title }}</h3>
              <p class="subtitle">{{ s.subtitle }}</p>
            </div>
          </div>
        </div>

        <!-- Правий клон -->
        <div v-if="rightClone" class="card">
          <div class="cardInner" :style="{ background: rightClone.color }">
            <div class="overlay">
              <h3 class="title">{{ rightClone.title }}</h3>
              <p class="subtitle">{{ rightClone.subtitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="nav right" type="button" @click="next" aria-label="Вперед">&gt;</button>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

type Slide = {
  id: number | string;
  color: string;
  title: string;
  subtitle: string;
};

const props = defineProps<{
  slides: Slide[];
  autoplayMs?: number;
}>();

const VISIBLE = 3;
const stepPct = 100 / VISIBLE; // 33.333%
const autoplayMs = computed(() => props.autoplayMs ?? 2800);

// локальна черга — її крутимо, щоб infinite був без “повернення”
const items = ref<Slide[]>([]);

// є 1 клон зліва, тому базова позиція — зсув на 1 “крок”
const position = ref(1); // 1 = показуємо перший реальний елемент
const anim = ref(false);
const locked = ref(false);

type Dir = "next" | "prev" | null;
const dir = ref<Dir>(null);

watch(
  () => props.slides,
  (v) => {
    items.value = [...(v ?? [])];
    anim.value = false;
    position.value = 1;
  },
  { immediate: true, deep: true }
);

const leftClone = computed(() => (items.value.length ? items.value[items.value.length - 1] : null));
const rightClone = computed(() => (items.value.length ? items.value[0] : null));

const trackStyle = computed(() => ({
  transform: `translateX(-${position.value * stepPct}%)`,
  transition: anim.value ? "transform 520ms ease" : "none",
}));

function next() {
  if (locked.value || items.value.length === 0) return;
  locked.value = true;
  dir.value = "next";
  anim.value = true;
  position.value = 2; // по 1 вправо
}

function prev() {
  if (locked.value || items.value.length === 0) return;
  locked.value = true;
  dir.value = "prev";
  anim.value = true;
  position.value = 0; // по 1 вліво
}

function onTransitionEnd() {
  if (!dir.value) return;

  // після руху: крутимо масив і миттєво повертаємось у базу (position=1) без анімації
  if (dir.value === "next") {
    const first = items.value.shift();
    if (first) items.value.push(first);
  } else {
    const last = items.value.pop();
    if (last) items.value.unshift(last);
  }

  anim.value = false;
  position.value = 1;
  dir.value = null;
  locked.value = false;
}

// autoplay
let timer: ReturnType<typeof setInterval> | null = null;

function start() {
  stop();
  timer = setInterval(() => {
    if (!locked.value) next();
  }, autoplayMs.value);
}
function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
function pause() {
  stop();
}
function resume() {
  start();
}

onMounted(() => start());
onBeforeUnmount(() => stop());
</script>

<style scoped>
.carousel {
  position: relative;
  padding: 36px 62px;
  border-radius: 15px;
  overflow: hidden;
}

.viewport {
  overflow: hidden;
}

/* ВАЖЛИВО: робимо “gap 30px” через padding + компенсацію, щоб крок 33.333% не ламався */
.track {
  display: flex;
  will-change: transform;
  margin: 0 5px; /* половина gap */
}

.card {
  flex: 0 0 calc(100% / 3);
  padding: 0 6px; /* 15 + 15 = 30px gap */
  box-sizing: border-box;
}

/* реальний “блок картинки/кольору” */
.cardInner {
  height: 250px;            /* ✅ висота 450 */
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

/* Текст з’являється при hover + затемнення */
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: #fff;

  background: rgba(0, 0, 0, 0);
  opacity: 0;
  transition: opacity 260ms ease, background 260ms ease;
}

.cardInner:hover .overlay {
  opacity: 1;
  background: rgba(0, 0, 0, 0.45);
}

.title {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
}

.subtitle {
  margin: 10px 0 0;
  font-size: 16px;
  line-height: 1.4;
  opacity: 0.95;
}

/* Кнопки */
.nav {
   color: var(--color-praymeri-light);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 0;
  cursor: pointer;
  background: var(--color-praymeri-blue);
  font-size: 30px;
  display: grid;
  place-items: center;
  z-index: 3;
}

.nav:hover {
    color: var(--color-praymeri-light);
 background: var(--color-praymeri-blueHover);
}

.left { left: 10px; }
.right { right: 10px; }

/* простий мобільний */
@media (max-width: 820px) {
  .carousel { padding: 18px 54px; }
  .cardInner { height: 320px; }
}
</style>