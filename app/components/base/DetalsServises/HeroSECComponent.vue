<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { imgUrl } from '~/composables/useApi'
import FormСontact from '~/components/ui/FormsComponents/FormСontact.vue'

interface Props {
  title: string
  buttonText: string
  buttonLink?: string
  section?: string
}

const props = defineProps<Props>()
const backgroundImage = ref('')
const showModal = ref(false)
const apiUrl = useRuntimeConfig().public.apiUrl

onMounted(async () => {
  if (!props.section) return
  try {
    const res = await fetch(`${apiUrl}/section-images/section/${props.section}`)
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) backgroundImage.value = imgUrl(data[0].imageUrl)
  } catch (e) {
    console.error('HeroSECComponent fetch error:', e)
  }
})
</script>

<template>
  <section
    class="heroAbaut-section"
    :style="backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}"
  >
    <div class="overlay"></div>
    <div class="container">
      <div class="heroAbaut-container">
        <div class="heroAbout-container-box">

          <h1 class="heroAbout-box__title">
            <span class="title-text">
              {{ title }}
            </span>
          </h1>

          <div class="heroButton-box">
            <button class="cta-btn" @click="showModal = true">
              {{ buttonText }}
            </button>
          </div>

        </div>
      </div>
    </div>
  </section>

  <div v-if="showModal" class="popup-overlay" @click.self="showModal = false">
    <div class="popup">
      <button class="popup-close" @click="showModal = false">×</button>
      <FormСontact />
    </div>
  </div>
</template>

<style scoped>
.heroAbaut-section {
  position: relative;
  margin-top: -60px;
  height: 470px;
  background-color: #1a1a2e;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.88),
    rgba(0, 0, 0, 0.35)
  );
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
}

.heroAbout-box__title {
  padding-top: 140px;
  text-align: center;
  width: 100%;
  display: inline-block;
  border-bottom: 2px solid var(--color-secondary-steel);
  padding-bottom: 30px;
}

.title-text {
  display: inline-block;
  opacity: 0;
  animation: fadeUp 1s ease forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.heroButton-box {
  margin-top: 35px;
  text-align: center;
}

.cta-btn {
  font-size: var(--font-s-button);
  border: 1px solid var(--color-praymeri-blue);
  background-color: var(--color-praymeri-blue);
  padding: var(--padding-size-basis);
  color: var(--color-praymeri-light);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  border-color: var(--color-praymeri-blueHover);
  background-color: var(--color-praymeri-blueHover);
}

.cta-btn:active {
  transform: translateY(1.4px);
}

/* MODAL */
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(8px);
  overflow-y: auto;
}

.popup {
  position: relative;
  width: 100%;
  max-width: 620px;
  border-radius: 30px;
  overflow: hidden;
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.18), transparent 34%),
    linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)),
    var(--color-praymeri-bg);
  border: 1px solid rgba(59, 130, 246, 0.22);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(22px);
}

.popup-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  color: var(--color-praymeri-light);
  font-size: 20px;
  cursor: pointer;
  transition: 0.25s ease;
}

.popup-close:hover {
  transform: rotate(90deg) scale(1.05);
  background: var(--color-praymeri-blue);
  border-color: var(--color-praymeri-blue);
}

@media (max-width: 430px) {
  .heroAbout-box__title {
    font-size: var(--font-s-Mobalh1);
    padding-top: 110px;
  }

  .heroAbaut-section {
    height: 330px;
  }
}
</style>
