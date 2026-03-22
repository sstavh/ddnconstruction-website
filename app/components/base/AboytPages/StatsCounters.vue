<template>
  <section ref="sectionRef" class="stats">
    <div class="container">
      <div v-for="(item, index) in stats" :key="index" class="item">
        
        <div class="number">
          <span class="num">{{ animatedValues[index] }}</span>
          <span v-if="item.suffix" class="suffix">
            {{ item.suffix }}
          </span>
        </div>

        <div class="text">
          {{ item.label }}
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

type Stat = {
  value: number
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { value: 1500, label: 'Клієнтів', suffix: '+' },
  { value: 12, label: 'Років досвіду' },
  { value: 98, label: 'Задоволених клієнтів', suffix: '%' }
]

const animatedValues = reactive<number[]>(stats.map(() => 0))

const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let started = false

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animate() {
  if (started) return
  started = true

  const duration = 1500
  const startTime = performance.now()

  const step = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1)

    stats.forEach((stat, i) => {
      animatedValues[i] = Math.floor(stat.value * easeOut(progress))
    })

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      stats.forEach((stat, i) => {
        animatedValues[i] = stat.value
      })
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  if (!sectionRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animate()
        observer?.disconnect()
      }
    },
    { threshold: 0.35 }
  )

  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.stats {
  padding: 70px 20px;

  /* 🔥 PREMIUM BACKGROUND */
  background:
    radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 55%),
    radial-gradient(circle at bottom right, rgba(16,185,129,0.10), transparent 60%),
    rgba(17, 24, 39, 0.92);

  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);

  color: var(--color-praymeri-light);

  backdrop-filter: blur(8px);
}

/* CONTAINER */
.container {
  margin: auto;
  display: flex;
  gap: 40px;
  text-align: center;
  align-items: stretch;
}

/* ITEM */
.item {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;

  

  /* 🔥 легкий glass card ефект */
  
  

  transition: 0.25s ease;
}



/* ===== NUMBERS ===== */
.number {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;

  min-height: 64px;
  line-height: 1;
}

.num {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
}

.suffix {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  transform: translateY(-6px);
}

/* TEXT */
.text {
  font-size: 16px;
  opacity: 0.75;
  max-width: 220px;
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 24px;
  }

  .item {
    padding: 16px;
  }

  .num {
    font-size: 38px;
  }
}

@media (max-width: 430px) {
  .stats {
    padding: 50px 14px;
  }

  .num {
    font-size: 32px;
  }

  .suffix {
    font-size: 16px;
  }

  .text {
    font-size: 14px;
  }
}
</style>  