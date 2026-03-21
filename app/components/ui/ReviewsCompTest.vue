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

              <div class="work">
                <img v-if="r.workPhoto" :src="r.workPhoto" class="work-img" />
                <div v-else class="work-fallback" :style="{ background: r.workFallbackColor }">
                  Фото роботи
                </div>
              </div>

              <div class="info">
                <div class="top">
                  <div class="avatar">
                    <img v-if="r.photo" :src="r.photo" class="avatar-img" />
                    <div v-else class="avatar-fallback" :style="{ background: r.avatarColor }">
                      {{ initials(r.name) }}
                    </div>
                  </div>

                  <div>
                    <div class="name">{{ r.name }}</div>
                    <div class="stars">
                      <span v-for="i in 5" :key="i" class="star" :class="{ on: i <= r.rating }">★</span>
                    </div>
                  </div>
                </div>

                <p class="text">“{{ r.text }}”</p>
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
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

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
  height: 390px;
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
  padding: 10px;
}

/* CARD */
.card {
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(17, 24, 39, 0.92);
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
  display: grid;
  grid-template-rows: 160px 1fr;
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
.text{
  margin-top: 15px;
  font-size: var( --font-s-MobalSmoll);
  margin-bottom: 10px;
}

.stars{
  margin-top: 10px;
  color: yellow ;
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