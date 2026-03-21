<template>
  <div
    class="card"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="overlay" />

    <div class="content" :class="{ visible: textVisible }">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Props = {
  text?: string
  colors?: [string, string, string] // рівно 3 кольори
  cycleSeconds?: number             // повний цикл (сек)
  randomMinWaitSeconds?: number     // мін. пауза між рандом-появами
  randomMaxWaitSeconds?: number     // макс. пауза між рандом-появами
  randomShowSeconds?: number        // скільки тримається текст без hover
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Наведи або почекай 🙂',
  colors: () => ['#6a11cb', '#2575fc', '#00c6ff'],
  cycleSeconds: 9,
  randomMinWaitSeconds: 5,
  randomMaxWaitSeconds: 14,
  randomShowSeconds: 6,
})

const isHovered = ref(false)
const randomVisible = ref(false)

const textVisible = computed(() => isHovered.value || randomVisible.value)

const cardStyle = computed(() => ({
  // CSS variables для анімації 3 кольорів
  '--c1': props.colors[0],
  '--c2': props.colors[1],
  '--c3': props.colors[2],
  '--cycle': `${props.cycleSeconds}s`,
}))

let showTimeout: ReturnType<typeof setTimeout> | null = null
let nextTimeout: ReturnType<typeof setTimeout> | null = null

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function scheduleRandomShow() {
  // якщо зараз hover — не ліземо, просто переплануємо
  const wait = randInt(props.randomMinWaitSeconds, props.randomMaxWaitSeconds) * 1000

  nextTimeout = setTimeout(() => {
    // якщо користувач навівся — пропускаємо “рандом” і плануємо далі
    if (isHovered.value) {
      scheduleRandomShow()
      return
    }

    randomVisible.value = true

    showTimeout = setTimeout(() => {
      randomVisible.value = false
      scheduleRandomShow()
    }, props.randomShowSeconds * 1000)
  }, wait)
}

onMounted(() => {
  scheduleRandomShow()
})

onBeforeUnmount(() => {
  if (showTimeout) clearTimeout(showTimeout)
  if (nextTimeout) clearTimeout(nextTimeout)
})
</script>

<style scoped>
.card {
  position: relative;
  width: 380px;
  height: 280px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  /* Плавна реакція на hover */
  transition: filter 250ms ease, box-shadow 250ms ease, transform 250ms ease;

  /* Фонова “циклічна” анімація з fade між 3 кольорами */
  background: linear-gradient(135deg, var(--c1), var(--c2));
  animation: bgCycle var(--cycle) ease-in-out infinite;
}

/* Легке затемнення + тінь при наведенні */
.card:hover {
  filter: brightness(0.88);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
  transform: translateY(-2px);
}

/* Додаткове “приглушення” через overlay (ефект затемнення/появи) */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.0);
  transition: background 250ms ease;
  pointer-events: none;
}
.card:hover .overlay {
  background: rgba(0,0,0,0.12);
}

/* Текст */
.content {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;

  padding: 10px 12px;
  border-radius: 12px;

  color: white;
  font-weight: 600;
  line-height: 1.2;

  /* невеликий “скляний” ефект */
  background: rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);

  /* приховано за замовчуванням */
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 260ms ease, transform 260ms ease;
}

.content.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 3 кольори — плавний цикл */
@keyframes bgCycle {
  0%   { background: linear-gradient(135deg, var(--c1), var(--c2)); }
  33%  { background: linear-gradient(135deg, var(--c2), var(--c3)); }
  66%  { background: linear-gradient(135deg, var(--c3), var(--c1)); }
  100% { background: linear-gradient(135deg, var(--c1), var(--c2)); }
}

@media (max-width: 768px){
  .card{
    width: 330px;
    height: 230px;
  }
}
</style>