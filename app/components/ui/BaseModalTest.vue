<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: "close"): void }>();

const onKeydown = (e: KeyboardEvent) => {
  if (!props.open) return;
  if (e.key === "Escape") emit("close");
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true">
        <button class="close" type="button" aria-label="Закрити" @click="emit('close')">×</button>

        <div class="content">
          <slot />
        </div>
      </div>
    </div>
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
  max-height: 90vh;          /* ✅ щоб не вилазило за екран */
  overflow: auto;            /* ✅ якщо форма велика — буде скрол */
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.25);
}

.content {
  padding: 28px 24px 24px;
}

.close {
  position: sticky;          /* ✅ хрестик завжди зверху при скролі */
  top: 12px;
  margin-left: auto;
  display: block;

  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background: rgba(0,0,0,0.06);
  font-size: 26px;
  line-height: 1;
}
.close:hover { background: rgba(0,0,0,0.1); }
</style>