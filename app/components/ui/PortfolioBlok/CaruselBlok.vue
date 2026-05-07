<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { fetchSection, imgUrl } from '~/composables/useApi'

type Slide = {
  id: number | string;
  color?: string;
  imageUrl?: string;
  title: string;
  subtitle: string;
};

const props = defineProps<{
  slides?: Slide[];
  sectionKey?: string;
  autoplayMs?: number;
}>();

/* ===================== */
/* 🔥 ADAPTIVE VISIBLE */
/* ===================== */
const visible = ref(3);

function updateVisible() {
  if (window.innerWidth <= 430) visible.value = 1;
  else if (window.innerWidth <= 1024) visible.value = 2;
  else visible.value = 3;
}

/* ===================== */
/* DATA */
/* ===================== */
const items = ref<Slide[]>([]);
const position = ref(1);
const anim = ref(false);
const locked = ref(false);

type Dir = "next" | "prev" | null;
const dir = ref<Dir>(null);

watch(
  () => props.slides,
  (v) => {
    if (!props.sectionKey) {
      items.value = [...(v ?? [])];
      position.value = 1;
      anim.value = false;
    }
  },
  { immediate: true }
);

async function fetchFromApi() {
  if (!props.sectionKey) return
  try {
    const data = await fetchSection(props.sectionKey)
    if (Array.isArray(data) && data.length > 0) {
      items.value = data
        .slice()
        .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
        .map((item: any) => ({
          id: item.id,
          imageUrl: imgUrl(item.imageUrl ?? ''),
          title: item.title || '',
          subtitle: item.description || '',
        }))
      position.value = 1
    }
  } catch {}
}

const leftClone = computed(() =>
  items.value.length ? items.value[items.value.length - 1] : null
);
const rightClone = computed(() =>
  items.value.length ? items.value[0] : null
);

const stepPct = computed(() => 100 / visible.value);

const trackStyle = computed(() => ({
  transform: `translateX(-${position.value * stepPct.value}%)`,
  transition: anim.value ? "transform 520ms ease" : "none",
}));

/* ===================== */
/* NAVIGATION */
/* ===================== */
function next() {
  if (locked.value) return;
  locked.value = true;
  dir.value = "next";
  anim.value = true;
  position.value = 2;
}

function prev() {
  if (locked.value) return;
  locked.value = true;
  dir.value = "prev";
  anim.value = true;
  position.value = 0;
}

function onTransitionEnd() {
  if (!dir.value) return;

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

/* ===================== */
/* AUTOPLAY */
/* ===================== */
const autoplayMs = computed(() => props.autoplayMs ?? 2800);
let timer: any = null;

function start() {
  stop();
  timer = setInterval(() => {
    if (!locked.value) next();
  }, autoplayMs.value);
}

function stop() {
  if (timer) clearInterval(timer);
}

function pause() {
  stop();
}

function resume() {
  start();
}

/* ===================== */
/* SWIPE */
/* ===================== */
let startX = 0;

function onTouchStart(e: TouchEvent) {
  startX = e.touches[0].clientX;
}

function onTouchEnd(e: TouchEvent) {
  const diff = startX - e.changedTouches[0].clientX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? next() : prev();
  }
}

/* ===================== */
/* LIFECYCLE */
/* ===================== */
onMounted(async () => {
  updateVisible();
  window.addEventListener("resize", updateVisible);
  await fetchFromApi();
  start();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateVisible);
  stop();
});
</script>

<template>
  <section class="carousel" @mouseenter="pause" @mouseleave="resume">

    <!-- LEFT -->
    <button class="nav left" @click="prev">&lt;</button>

    <div
      class="viewport"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="track" :style="trackStyle" @transitionend="onTransitionEnd">

        <!-- clone left -->
        <div v-if="leftClone" class="card">
          <div class="cardInner" :style="leftClone.imageUrl
            ? { backgroundImage: `url(${leftClone.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: leftClone.color || '#333' }">
            <div class="overlay">
              <h3>{{ leftClone.title }}</h3>
              <p>{{ leftClone.subtitle }}</p>
            </div>
          </div>
        </div>

        <!-- items -->
        <div v-for="s in items" :key="s.id" class="card">
          <div class="cardInner" :style="s.imageUrl
            ? { backgroundImage: `url(${s.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: s.color || '#333' }">
            <div class="overlay">
              <h3>{{ s.title }}</h3>
              <p>{{ s.subtitle }}</p>
            </div>
          </div>
        </div>

        <!-- clone right -->
        <div v-if="rightClone" class="card">
          <div class="cardInner" :style="rightClone.imageUrl
            ? { backgroundImage: `url(${rightClone.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: rightClone.color || '#333' }">
            <div class="overlay">
              <h3>{{ rightClone.title }}</h3>
              <p>{{ rightClone.subtitle }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- RIGHT -->
    <button class="nav right" @click="next">&gt;</button>

  </section>
</template>

<style scoped>
.carousel {
  position: relative;
  padding: 36px 62px;
  border-radius: 15px;
  overflow: hidden;
}

.viewport {
  overflow: hidden;
  touch-action: pan-y;
}

.track {
  display: flex;
  margin: 0 5px;
}

.card {
  flex: 0 0 calc(100% / 3);
  padding: 0 6px;
}

.cardInner {
  height: 250px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

/* overlay */
.overlay {
  position: absolute;
  inset: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
  opacity: 0;
  transition: 0.3s;
}

.cardInner:hover .overlay {
  opacity: 1;
  background: rgba(0,0,0,0.4);
}

/* NAV */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--color-praymeri-blue);
  color: white;
  font-size: 26px;
  cursor: pointer;
}

.left { left: 10px; }
.right { right: 10px; }

/* ===================== */
/* 📱 1024 → 2 */
/* ===================== */
@media (max-width: 1024px) {
  .card {
    flex: 0 0 calc(100% / 2);
  }
}

/* ===================== */
/* 📱 768 */
/* ===================== */
@media (max-width: 768px) {
  .carousel {
    padding: 20px 40px;
  }
}

/* ===================== */
/* 📱 430 → 1 + swipe */
/* ===================== */
@media (max-width: 430px) {
  .carousel {
    padding: 10px 0;
  }

  .card {
    flex: 0 0 100%;
  }

  .nav {
    display: none;
  }
}
</style>