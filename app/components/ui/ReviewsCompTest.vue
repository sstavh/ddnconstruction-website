<template>
  <section class="reviews">
    <div class="wrap">

      <button class="nav" @click="prev">&lt;</button>

      <div class="viewport" ref="viewportRef">
        <div
          class="track"
          :style="trackStyle"
          @transitionend="onTransitionEnd"
        >
          <div
            v-for="r in rendered"
            :key="r._k"
            class="slide"
          >
            <article class="card">
              <div class="card-photo">
                <img v-if="r.photo" :src="r.photo" class="work-img" />
                <div v-else class="photo-placeholder" :style="{ background: r.workFallbackColor || '#1e293b' }">
                  <span class="photo-icon">🏠</span>
                </div>
              </div>

              <div class="card-body">
                <div class="card-meta">
                  <div class="name">{{ r.name }}</div>
                  <div class="stars">
                    <span v-for="i in 5" :key="i" class="star" :class="{ on: i <= r.rating }">★</span>
                  </div>
                </div>

                <div class="text-wrap">
                  <p class="text">"{{ r.text }}"</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <button class="nav" @click="next">&gt;</button>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'

type Review = {
  id: string | number
  name: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  photo?: string
  avatarColor: string
  workPhoto?: string
  workFallbackColor?: string
}

const props = defineProps<{ reviews: Review[] }>()

const viewportRef = ref<HTMLElement | null>(null)

const visible = ref(3)
const index = ref(3) // старт після клонів
const anim = ref(true)

let timer: any = null

/* 🔥 responsive */
function update() {
  const w = window.innerWidth
  if (w <= 430) visible.value = 1
  else if (w <= 1024) visible.value = 2
  else visible.value = 3

  index.value = visible.value
}

/* 🔥 CLONES */
const rendered = computed(() => {
  const v = visible.value

  const head = props.reviews.slice(-v).map((r, i) => ({ ...r, _k: 'h' + r.id + i }))
  const body = props.reviews.map(r => ({ ...r, _k: 'b' + r.id }))
  const tail = props.reviews.slice(0, v).map((r, i) => ({ ...r, _k: 't' + r.id + i }))

  return [...head, ...body, ...tail]
})

/* 🔥 movement */
const trackStyle = computed(() => {
  const x = -(index.value * (100 / visible.value))
  return {
    transform: `translateX(${x}%)`,
    transition: anim.value ? 'transform 0.45s ease' : 'none'
  }
})

function next() {
  index.value++
}

function prev() {
  index.value--
}

/* 🔥 loop fix */
function onTransitionEnd() {
  const total = props.reviews.length
  const v = visible.value

  if (index.value >= total + v) {
    anim.value = false
    index.value = v
    requestAnimationFrame(() => anim.value = true)
  }

  if (index.value <= 0) {
    anim.value = false
    index.value = total
    requestAnimationFrame(() => anim.value = true)
  }
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

watch(
  () => props.reviews,
  () => {
    index.value = visible.value
    anim.value = false
    requestAnimationFrame(() => {
      anim.value = true
    })
  },
  { deep: true }
)

/* autoplay */
function start() {
  stop()
  timer = setInterval(next, 5000)
}

function stop() {
  if (timer) clearInterval(timer)
}

onMounted(() => {
  update()
  window.addEventListener('resize', update)
  start()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', update)
  stop()
})
</script>

<style scoped>
.reviews {
  padding: 40px 0;
}

/* WRAP */
.wrap {
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  gap: 16px;
  align-items: center;
}

/* VIEWPORT */
.viewport {
  height: 370px;
  overflow: hidden;
  border-radius: 18px;
}

/* TRACK */
.track {
  display: flex;
}

/* SLIDE */
.slide {
  flex: 0 0 33.333%;
  padding: 8px;
}

/* CARD */
.card {
  height: 354px;
  border-radius: 16px;
  background: rgba(17, 24, 39, 0.92);
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

/* WORK PHOTO */
.card-photo {
  width: 100%;
  height: 160px;
  flex-shrink: 0;
  overflow: hidden;
  background: #1e293b;
}

.work-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-icon {
  font-size: 36px;
  opacity: 0.4;
}

/* CARD BODY */
.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 14px 16px;
  overflow: hidden;
}

.card-meta {
  flex-shrink: 0;
  margin-bottom: 10px;
}

.name {
  font-weight: 600;
  font-size: 14px;
  color: #f1f5f9;
  margin-bottom: 4px;
}

.stars {
  display: flex;
  gap: 1px;
}

.star {
  font-size: 16px;
  color: rgba(255,255,255,0.25);
}

.star.on {
  color: #fbbf24;
}

/* TEXT (scrollable) */
.text-wrap {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.15) transparent;
}

.text-wrap::-webkit-scrollbar {
  width: 4px;
}

.text-wrap::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.18);
  border-radius: 4px;
}

.text {
  font-size: var(--font-s-MobalSmoll);
  line-height: 1.6;
  color: #cbd5e1;
  margin: 0;
}

/* NAV */
.nav {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: none;
  background: var(--color-praymeri-blue);
  color: #fff;
  cursor: pointer;
}

/* TABLET */
@media (max-width: 1024px) {
  .slide { flex: 0 0 50%; }
}

@media (max-width: 768px) {
  .slide { flex: 0 0 50%; }
}

/* MOBILE */
@media (max-width: 430px) {
  .wrap {
    grid-template-columns: 1fr;
  }

  .nav {
    display: none;
  }

  .slide {
    flex: 0 0 100%;
  }
}
</style>