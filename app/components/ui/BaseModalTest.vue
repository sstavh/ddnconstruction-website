<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from "vue";

type Origin = { x: number; y: number } | null;

const props = defineProps<{ open: boolean; origin?: Origin }>();
const emit = defineEmits<{ (e: "close"): void }>();

const onKeydown = (e: KeyboardEvent) => {
  if (!props.open) return;
  if (e.key === "Escape") emit("close");
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

const overlayStyle = computed(() => {
  const x = props.origin?.x ?? window.innerWidth / 2;
  const y = props.origin?.y ?? window.innerHeight / 2;
  return {
    "--ox": `${x}px`,
    "--oy": `${y}px`,
  } as Record<string, string>;
});
</script>

<template>
  <teleport to="body">
    <transition name="pop">
      <div
        v-if="open"
        class="overlay"
        :style="overlayStyle"
        @click.self="emit('close')"
      >
        <div class="modal" role="dialog" aria-modal="true">
          <button
            class="close"
            type="button"
            aria-label="Закрити"
            @click="emit('close')"
          >
            ×
          </button>

          <div class="content">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;

  /* 🔥 PREMIUM BACKDROP */
  background: rgba(2, 6, 23, 0.65);
  backdrop-filter: blur(10px);
}

/* =========================
   MODAL CARD (SAME STYLE AS OTHERS)
========================= */
.modal {
  position: relative;

  width: min(600px, 100%);
  max-height: 90vh;
  overflow: auto;

  border-radius: 22px;

  /* 🔥 SAME DARK GLASS STYLE */
  background:
    radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 55%),
    radial-gradient(circle at bottom right, rgba(16,185,129,0.10), transparent 60%),
    rgba(17, 24, 39, 0.92);

  border: 1px solid rgba(255,255,255,0.12);

  box-shadow:
    0 30px 80px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.05);

  color: #fff;

  transform-origin: center;
}

/* CONTENT */
.content {
  padding: 28px 26px;
}

/* CLOSE BUTTON */
.close {
  position: absolute;
  top: 14px;
  right: 14px;

  width: 40px;
  height: 40px;

  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;

  background: rgba(255,255,255,0.06);
  color: #fff;

  font-size: 22px;
  line-height: 1;

  cursor: pointer;
  transition: 0.2s ease;
}

.close:hover {
  background: rgba(59,130,246,0.2);
  transform: scale(1.05);
}

/* =========================
   ANIMATION (smooth + no glitch)
========================= */
.pop-enter-active .modal {
  transition:
    transform 0.25s ease,
    opacity 0.2s ease,
    filter 0.2s ease;
}

.pop-leave-active .modal {
  transition:
    transform 0.25s ease,
    opacity 0.2s ease,
    filter 0.2s ease;
  pointer-events: none;
}

.pop-enter-from .modal,
.pop-leave-to .modal {
  transform: scale(0.92);
  opacity: 0;
  filter: blur(6px);
}

.pop-enter-to .modal,
.pop-leave-from .modal {
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
}

/* OVERLAY FADE */
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.2s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
}

/* =========================
   MOBILE
========================= */
@media (max-width: 430px) {
  .modal {
    width: 100%;
    max-height: 95vh;
    border-radius: 16px;
  }

  .content {
    padding: 18px;
  }

  .close {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .modal,
  .overlay {
    transition: none !important;
    animation: none !important;
  }

  .pop-enter-from .modal,
  .pop-leave-to .modal {
    transform: none;
    opacity: 1;
    filter: none;
  }
}
</style>