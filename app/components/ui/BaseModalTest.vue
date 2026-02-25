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
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal {
  padding: 30px;
  position: relative;
  width: min(680px, 100%);
  max-height: 90vh;
  overflow: auto;
  background: var(--color-praymeri-light);
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
}

.content {
  padding: 28px 24px 24px;
}

.close {
  position: sticky;
  top: 12px;
  margin-left: auto;
  display: block;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.06);
  font-size: 26px;
  line-height: 1;
}
.close:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* =========================
   ВІДКРИТТЯ (швидке)
========================= */

.pop-enter-active .modal {
  transition:
    clip-path 0.22s cubic-bezier(.2,.9,.2,1),
    transform 0.22s cubic-bezier(.2,.9,.2,1),
    opacity 0.18s ease,
    filter 0.18s ease;
}

/* =========================
   ЗАКРИТТЯ (повільніше)
========================= */

.pop-leave-active .modal {
  transition:
    clip-path 0.9s cubic-bezier(.16,1,.3,1),
    transform 0.9s cubic-bezier(.16,1,.3,1),
    opacity 0.35s ease,
    filter 0.35s ease;
  pointer-events: none;
}

/* Початкові/кінцеві стани */

.pop-enter-from .modal,
.pop-leave-to .modal {
  clip-path: circle(0px at var(--ox) var(--oy));
  transform: scale(0.95);
  opacity: 0;
  filter: blur(4px);
}

.pop-enter-to .modal,
.pop-leave-from .modal {
  clip-path: circle(150vmax at var(--ox) var(--oy));
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
}

/* Overlay */

.pop-enter-active {
  transition: opacity 0.18s ease;
}

.pop-leave-active {
  transition: opacity 0.35s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
}

/* Reduced motion */

@media (prefers-reduced-motion: reduce) {
  .pop-enter-active .modal,
  .pop-leave-active .modal,
  .pop-enter-active,
  .pop-leave-active {
    transition: none !important;
  }
  .pop-enter-from .modal,
  .pop-leave-to .modal {
    clip-path: none;
    transform: none;
    opacity: 1;
    filter: none;
  }
}
</style>