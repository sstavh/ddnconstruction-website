<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import FormСontact from '~/components/ui/FormsComponents/FormСontact.vue'
import { imgUrl, getApiBase } from '~/composables/useApi'

const defaultBg = '/images/about/generalHero.jpg'
const showModal = ref(false)

const backgroundImage = ref('')
const sideImage = ref('')

async function fetchBackground() {
  try {
    const response = await fetch(`${getApiBase()}/section-images/section/generalHero`)
    const data = await response.json()
    if (data && data.length > 0) {
      backgroundImage.value = imgUrl(data[0].imageUrl)
    } else {
      backgroundImage.value = defaultBg
    }
  } catch {
    backgroundImage.value = defaultBg
  }
}

async function fetchSideImage() {
  try {
    const response = await fetch(`${getApiBase()}/section-images/section/generalHeroSide`)
    const data = await response.json()
    if (data && data.length > 0) {
      sideImage.value = imgUrl(data[0].imageUrl)
    }
  } catch {
    // fallback to purple block
  }
}

const sideImageStyle = computed(() =>
  sideImage.value
    ? { backgroundImage: 'url(' + sideImage.value + ')', backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}
)

onMounted(async () => {
  await Promise.all([fetchBackground(), fetchSideImage()])
})
</script>

<template>
  <section :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
    <div class="overlay"></div>
    <div class="container">
      <div class="general-container">
        <div class="general-container__box">
          <div
            data-aos="fade-right"
            class="foto-test"
            :style="sideImageStyle"
          ></div>
          <div class="generel-box">
            <h1 class="generel-box__title">Built with Responsibility.<br/>Delivered with Results.</h1>
            <p class="generel-box__pidtext">We specialize in high-quality remodeling and construction, focusing on precision, timelines, and clear communication.
Every project reflects our reputation — that's why we handle every detail from concept to completion.</p>
            <button class="cta-btn" data-aos="fade-up" @click="showModal = true">
            Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="popup-overlay" @click.self="showModal = false">
      <div class="popup">
        <div class="popup-head">
          <button class="popup-close" @click="showModal = false">×</button>
        </div>
        <FormСontact />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

section .container {
  position: relative;
  z-index: 2;
}

.general-container {
  margin-top: 160px;
  margin-bottom: 100px;
}

.general-container__box {
  display: flex;
  gap: 55px;
  justify-content: center;
}

.foto-test {
  width: 580px;
  height: 500px;
  flex-shrink: 0;
  background-color: blueviolet;
  border-radius: 16px;
}

.generel-box {
  margin-top: 90px;
  flex: 1;
  max-width: 760px;
  min-width: 0;
}

.generel-box__title {
  font-size: 57px;
}

.generel-box__pidtext {
  padding: 20px 0;
  font-size: var(--font-s-textSmoll);
  color: var(--color-praymeri-blekText);
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
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 30px;
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.18), transparent 34%),
    linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)),
    var(--color-praymeri-bg);
  border: 1px solid rgba(59, 130, 246, 0.22);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(22px);
}

.popup-head {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  padding: 12px 12px 0;
  pointer-events: none;
}

.popup-close {
  pointer-events: all;
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

@media (max-width: 1024px) {
  .general-container {
    margin-top: 100px;
    margin-bottom: 80px;
  }
  .general-container__box {
    gap: 32px;
  }
  .foto-test {
    width: 380px;
    height: 420px;
  }
  .generel-box {
    margin-top: 40px;
  }
  .generel-box__title {
    font-size: 42px;
  }
}

@media (max-width: 768px) {
  .general-container {
    margin-top: 80px;
    margin-bottom: 60px;
  }
  .foto-test {
    display: none;
  }
  .general-container__box {
    flex-direction: column;
    gap: 0;
  }
  .generel-box {
    margin-top: 0;
    max-width: 100%;
  }
  .generel-box__title {
    font-size: 36px;
  }
}

@media (max-width: 430px) {
  .general-container {
    margin-top: 60px;
    margin-bottom: 50px;
  }
  .generel-box__title {
    font-size: var(--font-s-Mobalh1);
    text-align: center;
  }
  .generel-box {
    text-align: center;
  }
}
</style>
