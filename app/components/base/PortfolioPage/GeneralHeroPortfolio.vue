<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { imgUrl, fetchSection } from '~/composables/useApi'
import FormСontact from '~/components/ui/FormsComponents/FormСontact.vue'

const sideImage = ref('')
const pageTitle = ref('See Our Work in Action')
const pageSubtitle = ref('Review real examples of our projects and see for yourself the quality that speaks for itself.')
const showModal = ref(false)

async function fetchData() {
  try {
    const data = await fetchSection('generalHeroPortfolio')
    if (data && data.length > 0) {
      sideImage.value = imgUrl(data[0].imageUrl)
      if (data[0].title) pageTitle.value = data[0].title
      if (data[0].description) pageSubtitle.value = data[0].description
    }
  } catch {
    // keep defaults
  }
}

onMounted(fetchData)
</script>

<template>
  <section>
    <div class="container">
      <div class="general-container">
        <div class="general-container__box">
          <div
            data-aos="fade-right"
            class="foto-test"
            :style="sideImage ? { backgroundImage: 'url(' + sideImage + ')', backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
          ></div>
          <div class="generel-box">
            <h1 class="generel-box__title">{{ pageTitle }}</h1>
            <p class="generel-box__pidtext">{{ pageSubtitle }}</p>
            <button class="cta-btn" data-aos="fade-up" @click="showModal = true">
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="popup-overlay" @click.self="showModal = false">
      <div class="popup">
        <button class="popup-close" @click="showModal = false">x</button>
        <FormСontact />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  position: relative;
  background: var(--color-praymeri-bg, #fff);
}

section .container {
  position: relative;
}

.general-container {
  margin-top: 160px;
  margin-bottom: 100px;
}

.general-container__box {
  display: flex;
  gap: 55px;
  justify-content: center;
  align-items: flex-start;
}

.foto-test {
  width: 580px;
  height: 500px;
  background-color: #1a1a2e;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
}

.generel-box {
  margin-top: 90px;
}

.generel-box__title {
  font-size: 48px;
  font-weight: 700;
}

.generel-box__pidtext {
  padding: 20px 0;
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

@media (max-width: 1024px) {
  .foto-test {
    height: 420px;
    width: 470px;
  }
  .general-container {
    margin-top: 100px;
  }
}

@media (max-width: 768px) {
  .foto-test {
    display: none;
  }
  .general-container__box {
    margin-left: 70px;
    display: block;
  }
}

@media (max-width: 430px) {
  .generel-box__title {
    font-size: var(--font-s-Mobalh1);
    text-align: center;
  }
  .general-container__box {
    margin-left: 0;
  }
  .generel-box {
    text-align: center;
  }
}
</style>
