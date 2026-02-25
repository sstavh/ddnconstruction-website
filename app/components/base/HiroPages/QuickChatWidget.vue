<script setup lang="ts">
import { ref, nextTick } from "vue";

const isOpen = ref(false);
const message = ref("");
const messages = ref<{ text: string; from: "user" | "bot" }[]>([]);

function toggleChat() {
  isOpen.value = !isOpen.value;
}

function sendMessage() {
  if (!message.value.trim()) return;

  messages.value.push({ text: message.value, from: "user" });

  // фейкова відповідь бота
  setTimeout(() => {
    messages.value.push({
      text: "Дякуємо за ваше повідомлення! Ми звʼяжемось з вами.",
      from: "bot",
    });
  }, 800);

  message.value = "";

  nextTick(() => {
    const container = document.querySelector(".chat-body");
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  });
}
</script>

<template>
  <div class="chat-wrapper">
    <!-- Чат вікно -->
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <span>Швидке питання</span>
        <button @click="toggleChat">✕</button>
      </div>

      <div class="chat-body">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['chat-message', msg.from]"
        >
          {{ msg.text }}
        </div>
      </div>

      <div class="chat-footer">
        <input
          v-model="message"
          @keyup.enter="sendMessage"
          placeholder="Напишіть повідомлення..."
        />
        <button @click="sendMessage">➤</button>
      </div>
    </div>

    <!-- Hover text -->
    <div class="chat-tooltip">
      Усі задайте швидке питання
    </div>

    <!-- Floating button -->
    <button class="chat-button" @click="toggleChat">
      💬
    </button>
  </div>
</template>

<style scoped>
.chat-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

/* Floating button */
.chat-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #116d33;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: 0.2s ease;
}

.chat-button:hover {
  transform: scale(1.05);
}

/* Tooltip */
.chat-tooltip {
  position: absolute;
  right: 70px;
  bottom: 18px;
  background: #111;
  color: #fff;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(5px);
  transition: 0.2s ease;
  pointer-events: none;
}

.chat-wrapper:hover .chat-tooltip {
  opacity: 1;
  transform: translateY(0);
}

/* Chat window */
.chat-window {
  position: absolute;
  bottom: 75px;
  right: 0;
  width: 300px;
  height: 400px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fadeIn 0.2s ease;
}

.chat-header {
  background: #116d33;
  color: white;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.chat-header button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.chat-body {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-message {
  max-width: 75%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
}

.chat-message.user {
  align-self: flex-end;
  background: #116d33;
  color: white;
}

.chat-message.bot {
  align-self: flex-start;
  background: #e4e4e4;
}

.chat-footer {
  display: flex;
  border-top: 1px solid #eee;
}

.chat-footer input {
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 14px;
  outline: none;
}

.chat-footer button {
  width: 50px;
  border: none;
  background: #116d33;
  color: white;
  cursor: pointer;
  font-size: 18px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>