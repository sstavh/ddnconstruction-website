<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
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
  { title: "Bathroom", link: "/services/BathroomServises" },
  { title: "Tiles", link: "/services/TilesSection" },
  { title: "Spackling / Painting", link: "/services/PaintingServises" },
  { title: "Electrical Work", link: "/services/ElectricalSection" },
  { title: "Plumbing", link: "/services/PlumbingSection" },
];

const isServicesOpen = ref(false);
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  isServicesOpen.value = false;
};

const toggleMobileServices = () => {
  if (window.innerWidth <= 768) {
    isServicesOpen.value = !isServicesOpen.value;
  }
};

const onScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeMobileMenu();
};

watch(isMobileMenuOpen, (value) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = value ? "hidden" : "";
  }
});

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
  if (closeTimer) window.clearTimeout(closeTimer);
});
</script>

<template>
  <header class="header glass" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="header-container">
        <div class="header-container__navigation">
          <ButtonBlef />

          <nav class="nav" :class="{ 'nav--open': isMobileMenuOpen }">
            <div class="mobile-menu-head">
              <span class="mobile-menu-title">Menu</span>

              <button class="mobile-close" @click="closeMobileMenu">
                ×
              </button>
            </div>

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
                <div class="nav-link nav-link--button">
                  <NuxtLink :to="item.link" class="nav-link__text" @click="closeMobileMenu">
                    {{ item.title }}
                  </NuxtLink>
                  <button class="chev-btn" @click="toggleMobileServices">
                    <span class="chev" :class="{ 'chev--open': isServicesOpen }">▾</span>
                  </button>
                </div>

                <transition name="dd">
                  <div v-show="isServicesOpen" class="dropdown-panel glass--strong">
                    <NuxtLink
                      v-for="s in services"
                      :key="s.link"
                      :to="s.link"
                      class="dropdown-item"
                      @click="closeMobileMenu"
                    >
                      {{ s.title }}
                    </NuxtLink>
                  </div>
                </transition>
              </div>
            </template>

            <div class="mobile-menu-footer">
              <Button ext="Button" @click="openFromClick" />
            </div>
          </nav>

          <div class="right-side">
            <button
              class="burger"
              :class="{ 'burger--active': isMobileMenuOpen }"
              @click="toggleMobileMenu"
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Button class="desktop-btn" ext="Button" @click="openFromClick" />
          </div>
        </div>
      </div>
    </div>

    <BaseModalTest class="header-form__box" :open="open" :origin="origin" @close="open = false">
      <FormСontact class="header-form" />
    </BaseModalTest>

    <transition name="overlay">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-overlay"
        @click="closeMobileMenu"
      ></div>
    </transition>
  </header>
</template>

<style scoped>
.header-form {
  margin: 0 auto;
  width: 500px;
  background: transparent;
  border: none;
  box-shadow: none;
}

.container {
  width: min(1160px, 100%);
  margin: 0 auto;
  padding: 0 16px;
}

.glass {
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 34%),
    linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)),
    rgba(10,10,10,0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 12px 35px rgba(0,0,0,0.22);
}

.glass--strong {
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 40%),
    rgba(10,10,10,0.82);
  backdrop-filter: blur(26px);
  -webkit-backdrop-filter: blur(26px);
  border: 1px solid rgba(255,255,255,0.08);
}

.header {
  position: sticky;
  top: 0;
  z-index: 3002;
}

.header--scrolled {
  border-radius: 0 0 22px 22px;
}

.header-container {
  padding: 14px 18px;
}

.header-container__navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav {
  display: flex;
  align-items: center;
  gap: 22px;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: rgba(245,245,245,0.9);
  font-family: var(--font-f-Inter);
  font-size: var(--font-s-navigation);
  font-weight: 500;
  transition: 0.25s ease;
}

.nav-link:hover {
  color: var(--color-praymeri-blue);
}

.nav-link--button {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link__text {
  text-decoration: none;
  color: rgba(245,245,245,0.9);
  font-family: var(--font-f-Inter);
  font-size: var(--font-s-navigation);
  font-weight: 500;
  transition: 0.25s ease;
}

.nav-link__text:hover {
  color: var(--color-praymeri-blue);
}

.chev-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  color: rgba(245,245,245,0.9);
  transition: 0.25s ease;
}

.chev-btn:hover {
  color: var(--color-praymeri-blue);
}

.chev {
  transition: 0.25s ease;
}

.chev--open {
  transform: rotate(180deg);
}

.dropdown {
  position: relative;
}

.dropdown-panel {
  position: absolute;
  top: 150%;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  padding: 18px;
  border-radius: 20px;
  display: grid;
  gap: 8px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.35);
}

.dropdown-item {
  text-decoration: none;
  color: rgba(245,245,245,0.85);
  padding: 13px 14px;
  border-radius: 14px;
  font-family: var(--font-f-Inter);
  font-size: 15px;
  transition: 0.25s ease;
}

.dropdown-item:hover {
  color: #fff;
  background: rgba(59, 130, 246, 0.18);
  transform: translateX(4px);
}

.right-side {
  display: flex;
  align-items: center;
  gap: 12px;
}

.burger {
  position: relative;
  display: none;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(59, 130, 246, 0.28);
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.25), transparent 45%),
    rgba(255,255,255,0.05);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  cursor: pointer;
  z-index: 3001;
  transition: 0.25s ease;
}

.burger span {
  position: absolute;
  left: 50%;
  width: 19px;
  height: 2px;
  background: var(--color-praymeri-light);
  border-radius: 10px;
  transform: translateX(-50%);
  transition: 0.3s ease;
}

.burger span:nth-child(1) {
  top: 15px;
}

.burger span:nth-child(2) {
  top: 22px;
}

.burger span:nth-child(3) {
  top: 29px;
}

.burger--active {
  background: var(--color-praymeri-blue);
  border-color: var(--color-praymeri-blue);
}

.burger--active span:nth-child(1) {
  top: 22px;
  transform: translateX(-50%) rotate(45deg);
}

.burger--active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-50%) scaleX(0);
}

.burger--active span:nth-child(3) {
  top: 22px;
  transform: translateX(-50%) rotate(-45deg);
}

.mobile-menu-head,
.mobile-menu-footer {
  display: none;
}

.dd-enter-active,
.dd-leave-active {
  transition: 0.25s ease;
}

.dd-enter-from,
.dd-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: 0.25s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .burger {
    display: block;
  }

  .desktop-btn {
    display: none;
  }

  .mobile-menu-head,
  .mobile-menu-footer {
    display: flex;
  }

  .mobile-menu-head {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .mobile-menu-title {
    color: var(--color-praymeri-light);
    font-family: var(--font-f-Rudik);
    font-size: 26px;
    font-weight: 600;
  }

  .mobile-close {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.07);
    color: #fff;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s ease;
  }

  .mobile-close:hover {
    background: rgba(59,130,246,0.25);
    border-color: rgba(59,130,246,0.4);
  }

  /* Full-screen overlay — з'являється зверху */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 3000;
    padding: 28px 22px 40px;
    overflow-y: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;

    /* прихований стан */
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px) scale(0.98);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;

    background:
      radial-gradient(circle at top right, rgba(59,130,246,0.22), transparent 38%),
      radial-gradient(circle at bottom left, rgba(59,130,246,0.08), transparent 40%),
      linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015)),
      var(--color-praymeri-bg);

    box-shadow: 0 30px 80px rgba(0,0,0,0.5);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
  }

  /* видимий стан */
  .nav--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .nav-link {
    width: 100%;
    padding: 16px 18px;
    border-radius: 16px;
    color: rgba(245,245,245,0.9);
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    font-size: 17px;
    transition: 0.2s ease;
  }

  .nav-link:hover {
    color: #fff;
    background: rgba(59,130,246,0.2);
    border-color: rgba(59,130,246,0.3);
  }

  .nav-link--button {
    padding: 0;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
  }

  .nav-link__text {
    flex: 1;
    padding: 16px 18px;
    font-size: 17px;
    color: rgba(245,245,245,0.9);
  }

  .chev-btn {
    padding: 16px 14px 16px 0;
    color: rgba(245,245,245,0.9);
  }

  .dropdown-panel {
    position: static;
    width: 100%;
    transform: none;
    margin-top: 8px;
    padding: 10px;
    border-radius: 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: none;
  }

  .dd-enter-from,
  .dd-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }

  .dropdown-item {
    padding: 12px 14px;
    font-size: 15px;
  }

  .mobile-menu-footer {
    margin-top: auto;
    padding-top: 24px;
  }

  .mobile-menu-footer :deep(button) {
    width: 100%;
  }

  .mobile-overlay {
    display: none;
  }
}

@media (max-width: 430px) {
  .container {
    max-width: none;
    padding: 0 12px;
  }

  .header-container {
    padding: 10px 0;
  }

  .right-side {
    gap: 8px;
  }

  .burger {
    width: 42px;
    height: 42px;
  }

  .burger span:nth-child(1) {
    top: 13px;
  }

  .burger span:nth-child(2) {
    top: 20px;
  }

  .burger span:nth-child(3) {
    top: 27px;
  }

  .burger--active span:nth-child(1),
  .burger--active span:nth-child(3) {
    top: 20px;
  }

  .nav {
    padding: 24px 16px 36px;
    gap: 8px;
  }

  .nav-link {
    font-size: 16px;
    padding: 15px 14px;
  }

  .header-form__box {
   width: 130px;
   padding: 0;
   margin: 0;
  }

  .header-form{
    display: block;
    width: 300px;
  }
}
</style>