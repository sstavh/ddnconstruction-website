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
  { title: "About us", link: "/about" },
  { title: "Portfolio", link: "/portfilio" },
  { title: "Calculator", link: "/calculator" },
  { title: "Services", link: "/service" },
  { title: "Pricing", link: "/pricing" },
];

const services = [
  { title: "Kitchen Service", link: "/services/KitchenServise" },
  { title: "Bathroom", link: "/services/bathroom" },
  { title: "Tiles", link: "/services/tiles" },
  { title: "Spackling / Painting", link: "/services/painting" },
  { title: "Electrical Work", link: "/services/electric" },
  { title: "Plumbing", link: "/services/plumbing" },
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

/* ================= MOBILE ================= */

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="header glass" :class="{ 'header--scrolled': isScrolled }">

    <div class="container">
      <div class="header-container">

        <div class="header-container__navigation">

          <!-- LEFT -->
          <ButtonBlef />

          <!-- CENTER NAV -->
          <nav class="nav" :class="{ 'nav--open': isMobileMenuOpen }">

            <template v-for="(item, i) in menu" :key="i">

              <NuxtLink
                v-if="item.title !== 'Services'"
                :to="item.link"
                class="nav-link"
                @click="closeMobileMenu"
              >
                {{ item.title }}
              </NuxtLink>

              <div
                v-else
                class="dropdown"
                @mouseenter="openServices"
                @mouseleave="closeServices"
              >
                <NuxtLink
                  :to="item.link"
                  class="nav-link"
                  @click="closeMobileMenu"
                >
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
                      @click="() => { isServicesOpen = false; closeMobileMenu(); }"
                    >
                      {{ s.title }}
                    </NuxtLink>
                  </div>
                </transition>
              </div>

            </template>

          </nav>

          <!-- RIGHT -->
          <div class="right-side">

            <!-- BURGER -->
            <button class="burger" @click="toggleMobileMenu">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Button ext="Button" @click="openFromClick" />

          </div>

        </div>
      </div>
    </div>

    <BaseModalTest :open="open" :origin="origin" @close="open = false">
      <FormСontact class="header-form" />
    </BaseModalTest>

    <!-- OVERLAY -->
    <div
      v-if="isMobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>

  </header>
</template>

<style scoped>
.container {
  width: min(1160px, 100%);
  margin: 0 auto;
  padding: 0 16px;
}

/* ================= GLASS ================= */

.glass {
  background: linear-gradient(135deg, rgba(255,255,255,0.22), rgba(130,22,22,0.08)),
    rgba(0,0,0,0.18);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.22);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
}

.glass--strong {
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(26px);
}

/* ================= HEADER ================= */

.header {
  position: sticky;
  z-index: 1000;
}

.header--scrolled {
  border-radius: 0 0 20px 20px;
}

.header-container {
  padding: 14px 18px;
}

.header-container__navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ================= NAV ================= */

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: rgba(220,235,255,0.95);
  font-size: 15px;
}

/* ================= DROPDOWN ================= */

.dropdown {
  position: relative;
}

.dropdown-panel {
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px;
  border-radius: 16px;
  display: grid;
  gap: 10px;
 width: 300px;
}

/* ================= RIGHT SIDE ================= */

.right-side {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ================= BURGER ================= */

.burger {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(12px);
  cursor: pointer;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.burger span {
  width: 18px;
  height: 2px;
  background: white;
  border-radius: 2px;
}

/* ================= MOBILE ================= */

@media (max-width: 768px) {

  .burger {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;

    flex-direction: column;
    padding: 90px 20px;
    gap: 18px;

    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(20px);

    transition: 0.3s ease;
    z-index: 2000;
  }

  .nav--open {
    right: 0;
  }

  .dropdown-panel {
    position: static;
    transform: none;
    background: transparent;
  }

  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1500;
  }
}
@media (max-width: 430px) {
.container{
  max-width: none;
}

  /* трохи компактніше header */
  .header-container {
    margin-top: 10px;
    margin-bottom: 10px;
  padding: 0;
  }

  /* кнопки менші, щоб не тиснули layout */
  .right-side {
    gap: 8px;
  }

  /* бургер менший */
  .burger {
    width: 40px;
    height: 40px;
  }

  .burger span {
    width: 16px;
  }

  /* меню займає всю ширину (краще UX на малих екранах) */
  .nav {
    width: 100%;
    right: -100%;
  }

  .nav--open {
    right: 0;
  }

  /* трохи більші клікабельні елементи */
  .nav-link {
    font-size: 16px;
    padding: 6px 0;
  }

  /* dropdown без “плаваючого” центру */
  .dropdown-panel {
    padding: 10px 0;
    gap: 8px;
  }

  .header-container__navigation{
    justify-content: none;
  }
}
</style>