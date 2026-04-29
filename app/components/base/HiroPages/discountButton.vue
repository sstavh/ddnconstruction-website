<template>
  <div>
    <button class="discount-btn" @click="openPopup">
      Отримати знижку
    </button>

    <div v-if="isOpen" class="popup-overlay" @click.self="closePopup">
      <div class="popup">
        <button class="popup-close" @click="closePopup">
          ×
        </button>

        <h2>Підпишіться та отримайте знижку</h2>

        <p class="popup-description">
          Підпишіться хоча б на одну соціальну мережу та отримайте персональну знижку.
          Після переходу вас автоматично перекине в калькулятор.
        </p>

        <div class="social-list">
          <button
            v-for="item in socials"
            :key="item.name"
            class="social-btn"
            @click="goSocial(item.url)"
          >
            {{ item.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface SocialItem {
  name: string
  url: string
}

const isOpen = ref(false)

const socials: SocialItem[] = [
  {
    name: 'Instagram',
    url: 'https://instagram.com'
  },
  {
    name: 'Telegram',
    url: 'https://t.me'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com'
  }
]

const openPopup = (): void => {
  isOpen.value = true
}

const closePopup = (): void => {
  isOpen.value = false
}

const goSocial = (url: string): void => {
  window.open(url, '_blank')
  sessionStorage.setItem('discount_active', 'true')

  setTimeout(() => {
    navigateTo('/calculator')
  }, 1000)
}
</script>

<style scoped>
.discount-btn {
  padding: var(--padding-size-basis);
  border: none;
  border-radius: 7px;
  background: var(--color-praymeri-blue);
  color: var(--color-praymeri-light);
  font-family: var(--font-f-Inter);
  font-size: var(--font-s-button);
  font-weight: var(--font-w-button);
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.28);
}

.discount-btn:hover {
  background: var(--color-praymeri-blueHover);
  transform: translateY(-3px);
}

.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(8px);
}

.popup {
  position: relative;
  width: 100%;
  max-width: 520px;
  padding: 42px 34px;
  border-radius: 30px;
  overflow: hidden;
  isolation: isolate;

  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.18), transparent 34%),
    radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.05), transparent 28%),
    linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)),
    var(--color-praymeri-bg);

  border: 1px solid rgba(59, 130, 246, 0.22);

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255,255,255,0.05),
    inset 0 -1px 0 rgba(255,255,255,0.02);

  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
}

.popup::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      130deg,
      rgba(255,255,255,0.08),
      transparent 22%,
      transparent 72%,
      rgba(255,255,255,0.04)
    );
  pointer-events: none;
}

.popup::after {
  content: "";
  position: absolute;
  width: 220px;
  height: 220px;
  right: -80px;
  top: -80px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.12);
  filter: blur(20px);
}

.popup-close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 5;

  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);

  background: rgba(255,255,255,0.04);
  color: var(--color-praymeri-light);

  font-size: 24px;
  cursor: pointer;
  transition: 0.25s ease;
}

.popup-close:hover {
  transform: rotate(90deg) scale(1.05);
  background: var(--color-praymeri-blue);
  border-color: var(--color-praymeri-blue);
}

.popup h2 {
  position: relative;
  z-index: 2;
  margin: 0 0 14px;
  font-family: var(--font-f-Rudik);
  font-size: var(--font-s-h3);
  font-weight: var(--font-w-h3);
  line-height: 1.15;
  color: var(--color-praymeri-light);
}

.popup-description {
  position: relative;
  z-index: 2;
  margin-bottom: 28px;
  font-family: var(--font-f-Inter);
  font-size: var(--font-s-text);
  color: rgba(255,255,255,0.72);
  line-height: 1.6;
}

.social-list {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 14px;
}

.social-btn {
  padding: 17px 20px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.06);

  background:
    linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02));

  color: var(--color-praymeri-light);
  font-family: var(--font-f-Inter);
  font-size: var(--font-s-navigation);
  font-weight: 600;

  cursor: pointer;
  transition: 0.28s ease;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.04),
    0 12px 24px rgba(0,0,0,0.22);
}

.social-btn:hover {
  transform: translateY(-3px);
  background: var(--color-praymeri-blue);
  border-color: var(--color-praymeri-blue);
  box-shadow:
    0 16px 30px rgba(59,130,246,0.28);
}

@media (max-width: 768px) {
  .popup {
    padding: 32px 22px;
    border-radius: 24px;
  }

  .popup h2 {
    font-size: var(--font-s-Mobalh3);
  }

  .popup-description {
    font-size: var(--font-s-MobalText);
  }

  .discount-btn {
    width: 100%;
  }

  .social-btn {
    padding: 15px 16px;
  }
}
</style>