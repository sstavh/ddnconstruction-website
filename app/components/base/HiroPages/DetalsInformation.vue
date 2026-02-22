<script setup lang="ts">
import { computed } from 'vue'

console.log("Information good work")

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

// Описуємо всі елементи списку як конфіг
type Item = { key: string; component: any; props?: Record<string, any> }

const items: Item[] = [
  { key: 'foto', component: FotoImgTest },
  { key: 'portfolio', component: FotosPortaolio, props: { class: 'update' } },
  { key: 'btn', component: ButtonInformationTest },
  {
    key: 'beforeAfter',
    component: beforeAfter,
    // якщо твій компонент приймає props як left-color/right-color:
    props: { 'left-color': '#ff0000', 'right-color': '#0000ff', class: 'h-56' }
    // якщо приймає camelCase (leftColor/rightColor) — заміни на:
    // props: { leftColor: '#ff0000', rightColor: '#0000ff', class: 'h-56' }
  },
  { key: 'carousel', component: caruseProgektTest, props: { slides } },
  { key: 'text', component: TextBlok }
]

// Групуємо по 3
const groups = computed(() => {
  const out: Item[][] = []
  for (let i = 0; i < items.length; i += 3) out.push(items.slice(i, i + 3))
  return out
})
</script>

<template>
  <div class="container">
    <div class="info-container">
      <div class="info-container__box">

        <!-- ГРУПИ -->
        <div class="groups">
          <div v-for="(group, gIndex) in groups" :key="gIndex" class="group">
            <ul class="group__ul">
              <li v-for="item in group" :key="item.key" class="group__li">
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
    margin-bottom: 60px;
    margin-top: 70px;
    border-radius: 20px;
    padding: 10px;
    background-color: rgb(55, 55, 55);
}
/* твій стиль */
.update {
    width: 600px;
  height: 350px;
}

/* групи по 3 */
.groups {
  display: flex;
  flex-direction: column;
  gap: 4px; /* відступ між групами */
}

.group__ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 в ряд */
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