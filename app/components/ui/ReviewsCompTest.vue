<template>
  <section class="reviews">
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    </div>

    <div class="wrap" @mouseenter="pause" @mouseleave="resume">
      <button class="nav left" type="button" @click="prev" aria-label="Попередні відгуки">‹</button>

      <!-- viewport -->
      <div class="viewport">
        <!-- track -->
        <div
          class="track"
          :class="{ anim: animate }"
          :style="trackStyle"
          @transitionend="onTransitionEnd"
        >
          <div
            v-for="r in rendered"
            :key="r._k"
            class="slide"
            :style="{ flex: `0 0 ${100 / visibleCount}%` }"
          >
            <article class="card">
              <div class="top">
                <div class="avatar" :style="{ background: r.avatarColor }" aria-hidden="true">
                  <span class="initials">{{ initials(r.name) }}</span>
                </div>
                <div class="meta">
                  <div class="name">{{ r.name }}</div>
                  <div class="stars" :aria-label="`Оцінка ${r.rating} з 5`">
                    <span
                      v-for="i in 5"
                      :key="i"
                      class="star"
                      :class="{ on: i <= r.rating }"
                      aria-hidden="true"
                    >★</span>
                  </div>
                </div>
              </div>

              <p class="text">“{{ r.text }}”</p>
            </article>
          </div>
        </div>
      </div>

      <button class="nav right" type="button" @click="next" aria-label="Наступні відгуки">›</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export type Review = {
  id: string | number
  name: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  avatarColor: string
}

type Props = {
  title?: string
  subtitle?: string
  reviews: Review[]
  visibleCount?: 1 | 2 | 3
  intervalMs?: number     // 30000
  transitionMs?: number   // швидкість анімації
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Відгуки',
  subtitle: '',
  visibleCount: 3,
  intervalMs: 30000,
  transitionMs: 450,
})

/**
 * Плавний “нескінченний” слайдер:
 * - додаємо клон останніх N на початок + перших N в кінець
 * - стартуємо з offset = N (на “першому справжньому” елементі)
 * - рухаємо offset на +1 / -1 з transition
 * - коли дійшли до клонів — стрибаємо без анімації назад у реальні
 */

const visibleCount = computed(() => props.visibleCount)
const n = computed(() => Math.min(visibleCount.value, props.reviews.length))

const animate = ref(true)
const offset = ref(n.value) // старт після префікс-клонів
const paused = ref(false)

let timer: ReturnType<typeof setInterval> | null = null

const rendered = computed(() => {
  const arr = props.reviews
  if (!arr.length) return []
  const k = n.value

  const head = arr.slice(-k).map((r, i) => ({ ...r, _k: `h-${r.id}-${i}` }))
  const body = arr.map((r) => ({ ...r, _k: `b-${r.id}` }))
  const tail = arr.slice(0, k).map((r, i) => ({ ...r, _k: `t-${r.id}-${i}` }))

  return [...head, ...body, ...tail]
})

const trackStyle = computed(() => {
  const x = -(offset.value * (100 / visibleCount.value))
  return {
    transform: `translateX(${x}%)`,
    transitionDuration: `${props.transitionMs}ms`,
  }
})

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase()
}

function startTimer() {
  stopTimer()
  if (paused.value) return
  timer = setInterval(() => {
    next(false) // авто не перезапускає таймер
  }, props.intervalMs)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function pause() {
  paused.value = true
  stopTimer()
}

function resume() {
  paused.value = false
  startTimer()
}

function next(restart = true) {
  if (props.reviews.length <= n.value) return
  animate.value = true
  offset.value += 1
  if (restart) startTimer()
}

function prev(restart = true) {
  if (props.reviews.length <= n.value) return
  animate.value = true
  offset.value -= 1
  if (restart) startTimer()
}

function onTransitionEnd() {
  const total = props.reviews.length
  const k = n.value

  // якщо зайшли в клон-кінець (після body)
  if (offset.value >= total + k) {
    animate.value = false
    offset.value = k
    // повертаємо анімацію в наступному кадрі
    requestAnimationFrame(() => { animate.value = true })
  }

  // якщо зайшли в клон-початок (до body)
  if (offset.value <= 0) {
    animate.value = false
    offset.value = total
    requestAnimationFrame(() => { animate.value = true })
  }
}

onMounted(() => startTimer())
onBeforeUnmount(() => stopTimer())

watch(
  () => props.reviews.length,
  () => {
    // якщо дані змінились — перебазуємось
    animate.value = false
    offset.value = n.value
    requestAnimationFrame(() => { animate.value = true })
    startTimer()
  }
)
</script>

<style scoped>
.reviews { padding: 34px 0; }
.header { text-align: center; margin-bottom: 18px; }
.title { margin: 0; font-size: 26px; font-weight: 800; }
.subtitle { margin: 10px 0 0; opacity: .75; font-size: 14px; }

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 54px 1fr 54px;
  gap: 12px;
  align-items: center;
  padding: 0 10px;
}

.viewport {
  overflow: hidden;
  border-radius: 18px;
}

.track {
  display: flex;
  will-change: transform;
}

.track.anim {
  transition-property: transform;
  transition-timing-function: ease;
}

.slide { padding: 10px; }

.card {
  height: 100%;
  border-radius: 18px;
  padding: 16px;
  background: rgba(17, 24, 39, 0.9);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 12px 30px rgba(0,0,0,0.18);
  color: white;
}

.top { display: flex; gap: 12px; align-items: center; }

.avatar {
  width: 54px; height: 54px;
  border-radius: 999px;
  display: grid; place-items: center;
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.22);
  flex: 0 0 auto;
}
.initials { font-weight: 800; }

.name {
  font-weight: 800;
  font-size: 15px;
  line-height: 1.2;
}

.stars { margin-top: 6px; display: flex; gap: 4px; }
.star { opacity: .25; font-size: 16px; }
.star.on { opacity: 1; }

.text {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: .93;
}

.nav {
  width: 54px; height: 54px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(17, 24, 39, 0.85);
  color: rgba(255,255,255,0.95);
  font-size: 30px;
  cursor: pointer;
  display: grid; place-items: center;
  user-select: none;
  transition: transform 120ms ease, background 120ms ease;
}
.nav:hover { transform: scale(1.04); background: rgba(17,24,39,0.95); }
.nav:active { transform: scale(0.98); }

@media (max-width: 900px) {
  .wrap { grid-template-columns: 44px 1fr 44px; }
  .nav { width: 44px; height: 44px; font-size: 26px; }
}

@media (max-width: 760px) {
  /* на мобілці краще 1 картка */
  /* якщо хочеш завжди 3 — прибери цей блок */
}
</style>