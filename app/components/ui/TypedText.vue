<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 70 },
  delay: { type: Number, default: 0 },
  cursor: { type: Boolean, default: true }
})

const displayed = ref('')
let timer = null
let startTimer = null

const clearTimers = () => {
  if (timer) clearTimeout(timer)
  if (startTimer) clearTimeout(startTimer)
  timer = null
  startTimer = null
}

const startTyping = () => {
  clearTimers()
  displayed.value = ''
  let i = 0

  const step = () => {
    if (i <= props.text.length) {
      displayed.value = props.text.slice(0, i)
      i += 1
      timer = setTimeout(step, props.speed)
    }
  }

  startTimer = setTimeout(step, props.delay)
}

onMounted(startTyping)
onBeforeUnmount(clearTimers)
watch(() => props.text, startTyping)
</script>

<template>
  <!-- wrapper займає місце під весь текст, але робить його невидимим -->
  <span class="typed-wrap">
    <span class="ghost">{{ text }}</span>

    <!-- поверх ghost друкується текст -->
    <span class="live" aria-hidden="true">
      {{ displayed }}<span v-if="cursor" class="cursor">|</span>
    </span>
  </span>
</template>

<style scoped>
.typed-wrap {
  position: relative;
  display: inline-block; /* важливо: не розтягує рядок зайво */
  white-space: pre-wrap;
}

/* невидимий текст, який тримає ширину/висоту */
.ghost {
  visibility: hidden;
}

/* те що друкується */
.live {
  position: absolute;
  inset: 0;
  white-space: pre-wrap;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
</style>
