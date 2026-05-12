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
  { key: 'foto', component: FotoImgTest, props: { section: 'fotoImgTest' }, aos: 'fade-right', duration: 1200, easing: 'ease-out-cubic', order: 3 },
  { key: 'portfolio', component: FotosPortaolio, props: { section: 'infoportfolio', class: 'update' }, aos: 'zoom-in', duration: 1200, easing: 'ease-out-back', order: 5 },
  { key: 'btn', component: ButtonInformationTest, aos: 'fade-up', duration: 1200, easing: 'ease-out-cubic', order: 1 },
  { key: 'beforeAfter', component: beforeAfter, props: { 'left-section': 'beforeAfterLeft', 'right-section': 'beforeAfterRight', 'left-color': '#ff0000', 'right-color': '#0000ff', class: 'h-56' }, aos: 'flip-left', duration: 1200, easing: 'ease-out-cubic', order: 2 },
  { key: 'carousel', component: caruseProgektTest, props: { section: 'carousel' }, aos: 'fade-left', duration: 1200, easing: 'ease-out-cubic', order: 6 },
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
                <component class="re" :is="item.component" v-bind="item.props" />
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
  grid-template-columns: repeat(3, 330px);
  justify-content: center;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.group__li {
  width: 330px;
  height: 300px;
  flex-shrink: 0;
  overflow: hidden;
}

.group__li > * {
  width: 100%;
  height: 100%;
}

.group__li :deep(.card) {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
}

.group__li :deep(.slider) {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
}

/* ================= */
/* ADAPTIVE */
/* ================= */

@media (max-width: 1060px) {
  
  .group__ul {
    grid-template-columns: repeat(3, 340px);
  }

  .group__li {
    width: 340px;
    height: 260px;
  }

  .info-container {
    padding: 24px;
    margin: 250px 0;
  }
}

@media (max-width: 960px) {
  .group__ul {
    grid-template-columns: repeat(2, 380px);
    gap: 14px;
  }

  .group__li {
    width: 380px;
    height: 300px;
  }
}

@media (max-width: 720px) {
  .group__ul {
    grid-template-columns: repeat(2, 320px);
    gap: 12px;
  }

  .group__li {
    width: 320px;
    height: 240px;
  }

  .info-container {
    padding: 20px;
    border-radius: 22px;
    margin: 80px 0;
  }

  .groups {
    gap: 12px;
  }
}

@media (max-width: 620px) {
  .group__ul {
    grid-template-columns: repeat(1, 360px);
    gap: 12px;
  }

  .group__li {
    width: 360px;
    height: 280px;
  }

  .group__li :deep(.card) {
    width: 100% !important;
    height: 100% !important;
  }

  .group__li :deep(.slider) {
    width: 100% !important;
    height: 100% !important;
  }
}

@media (max-width: 440px) {
  .group__ul {
    grid-template-columns: repeat(1, 300px);
    gap: 10px;
  }

  .group__li {
    width: 300px;
    height: 220px;
  }

  .group__li :deep(.card) {
    width: 100% !important;
    height: 100% !important;
  }

  .group__li :deep(.slider) {
    width: 100% !important;
    height: 100% !important;
  }

  .info-container {
    padding: 16px;
    border-radius: 18px;
    margin: 60px 0;
  }
}
</style>