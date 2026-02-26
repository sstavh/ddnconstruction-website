<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Button from "./ui/Button.vue";
import ButtonBlef from "./ui/ButtonBlef.vue";
import BaseModalTest from "./ui/BaseModalTest.vue";
import FormСontact from "./ui/FormsComponents/FormСontact.vue";


const open = ref(false);
const origin = ref<{ x: number; y: number } | null>(null);

const openFromClick = (e: MouseEvent) => {
  origin.value = { x: e.clientX, y: e.clientY };
  open.value = true;
};

const menu = [
  { title: "Про нас", link: "/about" },
  { title: "Портфоліо", link: "/portfilio" },
  { title: "Каркулятор", link: "/" },
  { title: "Послуги", link: "/services" },
  { title: "Прайс", link: "/" },
];

const services = [
  { title: "Кухні", link: "/services/kitchens" },
  { title: "Ванна кімната", link: "/services/bathroom" },
  { title: "Плитка", link: "/services/tiles" },
  { title: "Шпаклівка / фарбування", link: "/services/painting" },
  { title: "Електрика", link: "/services/electric" },
  { title: "Сантехніка", link: "/services/plumbing" },
];

const isServicesOpen = ref(false);
let closeTimer: number | null = null;

const openServices = () => {
  if (closeTimer) window.clearTimeout(closeTimer);
  isServicesOpen.value = true;
};

const closeServices = () => {
  closeTimer = window.setTimeout(() => {
    isServicesOpen.value = false;
  }, 140);
};

const isScrolled = ref(false);
const onScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  if (closeTimer) window.clearTimeout(closeTimer);
});
</script>

<template>
  <header class="header glass" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="header-container">
        <div class="header-container__navigation">
          <ButtonBlef />

          <nav class="nav">
            <template v-for="(item, i) in menu" :key="i">
              <NuxtLink
                v-if="item.title !== 'Послуги'"
                :to="item.link"
                class="nav-link"
              >
                {{ item.title }}
              </NuxtLink>

              <!-- Dropdown -->
              <div
                v-else
                class="dropdown"
                @mouseenter="openServices"
                @mouseleave="closeServices"
              >
                <NuxtLink :to="item.link" class="nav-link nav-link--dropdown">
                  {{ item.title }}
                  <span class="chev">▾</span>
                </NuxtLink>

                <transition name="dd">
                  <div v-show="isServicesOpen" class="dropdown-panel glass--strong">
                    <NuxtLink
                      v-for="s in services"
                      :key="s.link"
                      :to="s.link"
                      class="dropdown-item"
                      @click="isServicesOpen = false"
                    >
                      {{ s.title }}
                    </NuxtLink>
                  </div>
                </transition>
              </div>
            </template>
          </nav>

          <Button  @click="openFromClick" />

          <BaseModalTest :open="open" :origin="origin" @close="open = false">
            <FormСontact class="header-form" />
          </BaseModalTest>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.container {
  width: min(1160px, 100%);
  margin: 0 auto;
  padding: 0 16px;
}

/* ================= GLASS (HEADER) ================= */

.glass {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(130, 22, 22, 0.08)),
    rgba(0, 0, 0, 0.18);

  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);

  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

/* ================= STRONG GLASS (DROPDOWN) ================= */
/* ✅ Тут головне: сильніший темний шар, щоб НЕ було видно текст знизу */
.glass--strong {
  position: relative;
  isolation: isolate;

  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(130, 22, 22, 0.06)),
    rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(26px) saturate(170%);
  -webkit-backdrop-filter: blur(26px) saturate(170%);

  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.35);
}

/* Додатковий “дим” поверх (ще сильніше глушить фон) */
.glass--strong::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.45) /* постав 0.55 або 0.65 */і;
  pointer-events: none;
  z-index: 0;
}

/* Щоб контент був над ::before */
.glass--strong > * {
  position: relative;
  z-index: 1;
}

/* ================= HEADER ================= */

.header {
  position: sticky;

  z-index: 1000;

  transition: all 220ms ease;
}

.header--scrolled {
  top: 0;
  border-radius: 0 0 20px 20px;
}

.header-container {
  padding: 14px 18px;
}

.header-container__navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* ================= NAV ================= */

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: rgba(220, 235, 255, 0.95);
  font-size: 15px;
  transition: 0.2s ease;
}

.nav-link:hover {
  color: #fff;
  transform: translateY(-1px);
}

/* ================= DROPDOWN ================= */

.dropdown {
  position: relative;
}

.chev {
  font-size: 12px;
  margin-left: 4px;
}

.dropdown-panel {
  z-index: 99999;
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 260px;

  padding: 16px;
  border-radius: 20px;

  display: grid;
  gap: 10px;
}

.dropdown-item {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
  padding: 10px 14px;
  border-radius: 12px;
  transition: 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translateY(-2px);
}

/* ================= ANIMATION ================= */

.dd-enter-active,
.dd-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.dd-enter-from,
.dd-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px) scale(0.98);
}

.dd-enter-to,
.dd-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
}

.header-form{
  background-color: var(--color-praymeri-light);
  border: none;
  border-radius: none;
  color: var(--color-praymeri-blek);
  width: 100%;padding: 0;
  margin: 0;
   }
</style>