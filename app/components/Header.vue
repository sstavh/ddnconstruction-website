<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Button from './ui/Button.vue'
import ButtonBlef from './ui/ButtonBlef.vue'

const menu = [
  { title: 'Про нас', link: '/' },
  { title: 'Портфоліо', link: '/' },
  { title: 'Каркулятор', link: '/' },
  { title: 'Послуги', link: '/' },
  { title: 'Прайс', link: '/' },
]

// sticky + ефект при скролі
const isScrolled = ref(false)

const onScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="header-container">
        <div class="header-container__navigation">
          <ButtonBlef />

          <nav class="nav">
            <NuxtLink
              v-for="(item, i) in menu"
              :key="i"
              :to="item.link"
              class="nav-link"
            >
              {{ item.title }}
            </NuxtLink>
          </nav>

          <Button />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Glass header */
.header {
  position: sticky;
  top: 12px; /* щоб був “плаваючий” відступ зверху */
  z-index: 1000;

  /* glass */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0.08)
  );
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border: 1px solid rgba(255, 255, 255, 0.22);
  

  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);

  transition: all 220ms ease;
}

/* При скролі — трошки більш “щільний” і менша тінь */
.header--scrolled {
  top: 0;
  border-radius: 0 0 18px 18px;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.30),
    rgba(255, 255, 255, 0.12)
  );
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);

  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.10);
}

/* Layout */
.header-container {
  padding: 14px 18px;
}

.header-container__navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-align: center;
}

/* Nav */
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.nav-link {
  margin: 0 10px;
  padding: 10px 12px;

  border-radius: 12px;

  color: inherit;
  text-decoration: none;

  transition: background 180ms ease, transform 180ms ease;
}

.nav-link{
    transition: all 220ms ease;
}

.nav-link:hover {
  transform: translateY(-1px);
  color: var(--color-praymeri-blue);
}

/* активний лінк Nuxt */


/* Трохи адаптиву */
@media (max-width: 900px) {
  .nav {
    display: none; /* якщо хочеш бургер — скажи, зроблю */
  }
  .header-container__navigation {
    justify-content: space-between;
  }
}
</style>
