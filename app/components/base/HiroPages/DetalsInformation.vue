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

  // КАСТОМНИЙ ПОРЯДОК появи:
  // 1 = першим, 2 = другим, ...
  order: number
}

const items: Item[] = [
  // 1) foto — має з’явитись 3-м
  {
    key: 'foto',
    component: FotoImgTest,
    aos: 'fade-right',
    duration: 1200,
    easing: 'ease-out-cubic',
    order: 3
  },

  // 2) portfolio — має з’явитись 5-м
  {
    key: 'portfolio',
    component: FotosPortaolio,
    props: { class: 'update' },
    aos: 'zoom-in',
    duration: 1200,
    easing: 'ease-out-back',
    order: 5
  },

  // 3) btn — має з’явитись 1-м
  {
    key: 'btn',
    component: ButtonInformationTest,
    aos: 'fade-up',
    duration: 1200,
    easing: 'ease-out-cubic',
    order: 1
  },

  // 4) beforeAfter — має з’явитись 2-м
  {
    key: 'beforeAfter',
    component: beforeAfter,
    props: { 'left-color': '#ff0000', 'right-color': '#0000ff', class: 'h-56' },
    aos: 'flip-left',
    duration: 1200,
    easing: 'ease-out-cubic',
    order: 2
  },

  // 5) carousel — має з’явитись 6-м
  {
    key: 'carousel',
    component: caruseProgektTest,
    props: { slides },
    aos: 'fade-left',
    duration: 1200,
    easing: 'ease-out-cubic',
    order: 6
  },

  // 6) text — має з’явитись 4-м
  {
    key: 'text',
    component: TextBlok,
    aos: 'fade-up',
    duration: 1200,
    easing: 'ease-out-cubic',
    order: 4
  }
]

// крок між появами (чим більше — тим повільніше каскад)
const STEP = 300

// додаємо delay на основі order
const itemsWithDelay = computed(() =>
  items.map((it) => ({
    ...it,
    delay: (it.order - 1) * STEP
  }))
)

// групи по 3
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
.info-container {
  margin-bottom: 160px;
  margin-top: 150px;
  border-radius: 20px;
  padding: 10px;
  background-color: rgb(55, 55, 55);
}

.update {
  width: 600px;
  height: 350px;
}

/* групи по 3 */
.groups {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.group__ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.group__li {
  display: flex;
}

/* адаптив */
@media (max-width: 1024px) {
  .group__ul {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .group__ul {
    grid-template-columns: 1fr;
  }
}
</style>