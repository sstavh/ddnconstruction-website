<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import FotoImgTest from '~/components/ui/informationBlok/FotoImgTest.vue'
import FotosPortaolio from '~/components/ui/FotosPortaolio.vue'
import ButtonInformationTest from '~/components/ui/informationBlok/ButtonInformationTest.vue'
import TextBlok from '~/components/ui/informationBlok/TextBlok.vue'
import beforeAfter from '~/components/ui/informationBlok/beforeAfter.vue'
import caruseProgektTest from '~/components/ui/informationBlok/caruseProgektTest.vue'

const slides = [
  { color: '#ff004c', title: 'Title 1', text: 'Text for slide 1' },
  { color: '#ffb300', title: 'Title 2', text: 'Text for slide 2' },
  { color: '#00d084', title: 'Title 3', text: 'Text for slide 3' },
  { color: '#007bff', title: 'Title 4', text: 'Text for slide 4' },
  { color: '#7c3aed', title: 'Title 5', text: 'Text for slide 5' }
]

type Item = {
  key: string
  component: any
  props?: Record<string, any>
  aos?: string
  duration?: number
  easing?: string
  anchorPlacement?: string
  order: number
}

const items: Item[] = [
  { key: 'foto', component: FotoImgTest, aos: 'fade-right', duration: 1200, easing: 'ease-out-cubic', order: 3 },
  { key: 'portfolio', component: FotosPortaolio, props: { class: 'update' }, aos: 'zoom-in', duration: 1200, easing: 'ease-out-back', order: 5 },
  { key: 'btn', component: ButtonInformationTest, aos: 'fade-up', duration: 1200, easing: 'ease-out-cubic', order: 1 },
  { key: 'beforeAfter', component: beforeAfter, props: { 'left-color': '#ff0000', 'right-color': '#0000ff', class: 'h-56' }, aos: 'flip-left', duration: 1200, easing: 'ease-out-cubic', order: 2 },
  { key: 'carousel', component: caruseProgektTest, props: { slides }, aos: 'fade-left', duration: 1200, easing: 'ease-out-cubic', order: 6 },
  { key: 'text', component: TextBlok, aos: 'fade-up', duration: 1200, easing: 'ease-out-cubic', order: 4 }
]

const STEP = 300

const itemsWithDelay = computed(() =>
  items.map((it) => ({
    ...it,
    delay: (it.order - 1) * STEP
  }))
)

const groups = computed(() => {
  const out: any[][] = []
  for (let i = 0; i < itemsWithDelay.value.length; i += 3) {
    out.push(itemsWithDelay.value.slice(i, i + 3))
  }
  return out
})

onMounted(async () => {
  AOS.init({
    once: true,
    offset: 60
  })

  await nextTick()
  AOS.refreshHard()
})
</script>

<template>
  <div class="container">
    <div class="info-container">
      <div class="info-container__box">
        <div class="groups">
          <div v-for="(group, gIndex) in groups" :key="gIndex" class="group">
            <ul class="group__ul">
              <li
                v-for="item in group"
                :key="item.key"
                class="group__li"
                :data-aos="item.aos"
                :data-aos-duration="item.duration"
                :data-aos-delay="item.delay"
                :data-aos-easing="item.easing"
                :data-aos-anchor-placement="item.anchorPlacement || 'top-bottom'"
              >
                <component :is="item.component" v-bind="item.props" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


/* MAIN BLOCK */
.info-container {
  position: relative;
  margin: 140px 0;
  padding: 28px;
  border-radius: 28px;

  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 35%),
    linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
    var(--color-praymeri-bg);

  border: 1px solid rgba(59, 130, 246, 0.2);

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

.info-container::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.04) 0%,
    transparent 45%,
    rgba(59,130,246,0.05) 100%
  );
}

.info-container__box {
  position: relative;
  z-index: 1;
}

/* GROUPS */
.groups {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.group__ul {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.group__li {
  display: flex;
  width: 100%;
  height: 100%;
}

.group__li > * {
  width: 100%;
  height: 100%;
}

/* FIX COMPONENT SIZE */
.update {
  width: 100%;
  height: 100%;
  min-height: 280px;
}

/* ================= */
/* ADAPTIVE */
/* ================= */

@media (max-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .group__ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .info-container {
    padding: 24px;
    margin: 100px 0;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 720px;
  }

  .info-container {
    padding: 22px;
    border-radius: 24px;
  }

  .groups {
    gap: 14px;
  }

  .group__ul {
    gap: 14px;
  }
}

@media (max-width: 600px) {
  .group__ul {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 430px) {
  .group__li{
    height: 350px;
  }


  .info-container {
    margin: 80px 0;
    padding: 18px;
    border-radius: 20px;
  }

  
 
}
</style>