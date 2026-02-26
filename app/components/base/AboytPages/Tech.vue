<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section ref="sectionRef" class="tech-section">
    <div class="container">
      <h3 data-aos="fade-up" class="tech-title">Технології виробництва</h3>

      <div class="tech-list">
        <div
          v-for="(item, i) in 3"
          :key="i"
          class="tech-card"
          :class="{ show: isVisible }"
          :style="{ transitionDelay: `${i * 200}ms` }"
        >
          <h4>Заголовок {{ i + 1 }}</h4>
          <p>
            Опис технології виробництва. Короткий текст для прикладу.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-section{
  padding: 80px 0;
}

.tech-title{
    margin-top: 60px;
  text-align: center;
  margin-bottom: 80px;
}

.tech-list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Початковий стан (блок праворуч) */
.tech-card{
  padding: 20px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);

  opacity: 0;
  transform: translateX(120px);
  transition: all 0.6s ease;
}

/* Коли з'являється */
.tech-card.show{
  opacity: 1;
  transform: translateX(0);
}
</style>