<template>
  <Teleport to="body">
    <div class="discount-float">
      <transition name="tooltip">
        <div v-if="showTooltip && !isOpen" class="discount-tooltip">
          Click to get a discount!
          <button class="tooltip-close" @click.stop="dismissTooltip">×</button>
        </div>
      </transition>

      <button
        class="discount-circle"
        :class="{ 'discount-circle--pulse': showTooltip && !isOpen }"
        @click="openPopup"
        aria-label="Get a discount"
      >
        <span class="percent">%</span>
      </button>
    </div>

    <transition name="popup-fade">
      <div v-if="isOpen" class="popup-overlay" @click.self="closePopup">
        <div class="popup">
          <button class="popup-close" @click="closePopup">×</button>

          <div class="popup-header">
            <div class="popup-badge">Special Offer</div>
            <h2 class="popup-title">Subscribe & Get a Discount</h2>
            <p class="popup-desc">
              Follow us on social media and receive a personal discount on your next project.
              After visiting, you'll be redirected to our calculator.
            </p>
          </div>

          <div class="social-list">
            <a
              v-for="item in socials"
              :key="item.name"
              :href="item.url"
              target="_blank"
              class="social-btn"
              :class="{ 'social-btn--visited': visitedSocials.has(item.name) }"
              @click="markVisited(item.name)"
            >
              <img :src="item.icon" :alt="item.name" class="social-icon" />
              <span>{{ item.name }}</span>
              <span v-if="visitedSocials.has(item.name)" class="social-check">✓</span>
            </a>
          </div>

          <transition name="tooltip">
            <p v-if="!allVisited" class="popup-hint">
              Subscribe to all accounts to unlock the discount
            </p>
          </transition>

          <button
            v-if="allVisited"
            class="go-btn"
            @click="goToCalculator"
          >
            Get Discount & Go to Calculator →
          </button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import tiktokIcon from '~/assets/icon/free-icon-tiktok-3669950.png'
import instagramIcon from '~/assets/icon/free-icon-instagram-1384015.png'
import facebookIcon from '~/assets/icon/free-icon-facebook-circular-logo-20673.png'

const STORAGE_KEY = 'discount_visited_socials'

const isOpen = ref(false)
const showTooltip = ref(false)
let tooltipTimer: ReturnType<typeof setTimeout> | null = null

const socials = [
  { name: 'TikTok',    url: 'https://www.tiktok.com/',    icon: tiktokIcon },
  { name: 'Instagram', url: 'https://www.instagram.com/', icon: instagramIcon },
  { name: 'Facebook',  url: 'https://www.facebook.com/',  icon: facebookIcon },
]

const visitedSocials = ref<Set<string>>(new Set())

const allVisited = computed(() => visitedSocials.value.size >= socials.length)

onMounted(() => {
  tooltipTimer = setTimeout(() => {
    showTooltip.value = true
  }, 4000)

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as string[]
      visitedSocials.value = new Set(parsed)
    }
  } catch {}
})

onBeforeUnmount(() => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
})

const dismissTooltip = () => { showTooltip.value = false }
const openPopup = () => { isOpen.value = true; showTooltip.value = false }
const closePopup = () => { isOpen.value = false }

const markVisited = (name: string) => {
  visitedSocials.value = new Set([...visitedSocials.value, name])
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visitedSocials.value]))
  } catch {}
}

const goToCalculator = () => {
  sessionStorage.setItem('discount_active', 'true')
  navigateTo('/calculator')
}
</script>

<style scoped>
/* ── Floating wrapper ── */
.discount-float {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  pointer-events: none;
}

/* ── Circle button ── */
.discount-circle {
  pointer-events: all;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid rgba(59, 130, 246, 0.5);
  background:
    radial-gradient(circle at 35% 35%, rgba(99, 102, 241, 0.9), rgba(59, 130, 246, 0.85));
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 8px 28px rgba(59, 130, 246, 0.45),
    0 2px 8px rgba(0,0,0,0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.discount-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 36px rgba(59, 130, 246, 0.6);
}

.percent {
  line-height: 1;
  letter-spacing: -1px;
}

/* pulse when tooltip is shown */
@keyframes float-pulse {
  0%, 100% { box-shadow: 0 8px 28px rgba(59,130,246,0.45), 0 0 0 0 rgba(59,130,246,0.4); }
  50% { box-shadow: 0 8px 28px rgba(59,130,246,0.45), 0 0 0 12px rgba(59,130,246,0); }
}

.discount-circle--pulse {
  animation: float-pulse 2s ease infinite;
}

/* ── Tooltip ── */
.discount-tooltip {
  pointer-events: all;
  position: relative;
  background:
    radial-gradient(circle at top right, rgba(59,130,246,0.2), transparent 50%),
    rgba(15, 20, 40, 0.92);
  border: 1px solid rgba(59,130,246,0.3);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 36px 10px 14px;
  border-radius: 14px;
  white-space: nowrap;
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.35);
}

.discount-tooltip::after {
  content: '';
  position: absolute;
  bottom: -6px;
  right: 22px;
  width: 10px;
  height: 10px;
  background: rgba(15, 20, 40, 0.92);
  border-right: 1px solid rgba(59,130,246,0.3);
  border-bottom: 1px solid rgba(59,130,246,0.3);
  transform: rotate(45deg);
}

.tooltip-close {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 16px;
  cursor: pointer;
  padding: 2px 4px;
  line-height: 1;
  transition: color 0.2s;
}
.tooltip-close:hover { color: #fff; }

/* ── Tooltip animation ── */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* ── Popup overlay ── */
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(10px);
}

/* ── Popup card ── */
.popup {
  position: relative;
  width: 100%;
  max-width: 480px;
  padding: 40px 34px 36px;
  border-radius: 28px;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at top right, rgba(59,130,246,0.2), transparent 38%),
    radial-gradient(circle at bottom left, rgba(99,102,241,0.12), transparent 40%),
    rgba(13, 18, 35, 0.96);
  border: 1px solid rgba(59,130,246,0.22);
  box-shadow:
    0 32px 80px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.05);
  backdrop-filter: blur(24px);
}

.popup-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  transition: 0.25s ease;
}
.popup-close:hover {
  transform: rotate(90deg) scale(1.05);
  background: rgba(59,130,246,0.3);
}

.popup-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 30px;
  background: rgba(59,130,246,0.18);
  border: 1px solid rgba(59,130,246,0.3);
  color: rgba(147, 197, 253, 1);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.popup-title {
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.popup-desc {
  margin-bottom: 28px;
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
}

/* ── Social buttons ── */
.social-list {
  display: grid;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 18px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.04);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
}
.social-btn:hover {
  transform: translateX(5px);
  background: rgba(59,130,246,0.18);
  border-color: rgba(59,130,246,0.35);
}

.social-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 8px;
}

.social-btn--visited {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.35);
}

.social-check {
  margin-left: auto;
  color: #4ade80;
  font-size: 18px;
  font-weight: 700;
}

.popup-hint {
  margin-top: 16px;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
}

.go-btn {
  margin-top: 20px;
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(99, 102, 241, 0.9));
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
}

.go-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
}

/* ── Popup animation ── */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.25s ease;
}
.popup-fade-enter-active .popup,
.popup-fade-leave-active .popup {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
.popup-fade-enter-from .popup,
.popup-fade-leave-to .popup {
  transform: scale(0.92) translateY(16px);
  opacity: 0;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .discount-float {
    bottom: 20px;
    right: auto;
    left: 20px;
    align-items: flex-start;
  }

  .discount-tooltip::after {
    right: auto;
    left: 22px;
  }
}

@media (max-width: 430px) {
  .discount-float {
    bottom: 20px;
    right: auto;
    left: 16px;
    align-items: flex-start;
  }
  .discount-circle {
    width: 52px;
    height: 52px;
    font-size: 20px;
  }
  .popup {
    padding: 32px 20px 28px;
    border-radius: 20px;
  }
  .popup-title {
    font-size: 20px;
  }
}
</style>
