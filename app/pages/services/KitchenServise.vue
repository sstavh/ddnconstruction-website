<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const cards = [
  {
    logo: "/logo.png",
    title: "Назва блоку",
    description: "Хмарка тепер завжди буде видима всередині блоку.",
    colors: ['#3b82f6', '#8b5cf6', '#22c55e'],
    blockColor: "#111827"
  },
  {
    logo: "/logo.png",
    title: "Назва блоку",
    description: "Хмарка тепер завжди буде видима всередині блоку.",
    colors: ['#3b82f6', '#8b5cf6', '#22c55e'],
    blockColor: "#111827"
  },
  {
    logo: "/logo.png",
    title: "Назва блоку",
    description: "Хмарка тепер завжди буде видима всередині блоку.",
    colors: ['#3b82f6', '#8b5cf6', '#22c55e'],
    blockColor: "#111827"
  },
  {
    logo: "/logo.png",
    title: "Назва блоку",
    description: "Хмарка тепер завжди буде видима всередині блоку.",
    colors: ['#3b82f6', '#8b5cf6', '#22c55e'],
    blockColor: "#111827"
  },
  {
    logo: "/logo.png",
    title: "Назва блоку",
    description: "Хмарка тепер завжди буде видима всередині блоку.",
    colors: ['#3b82f6', '#8b5cf6', '#22c55e'],
    blockColor: "#111827"
  },
  {
    logo: "/logo.png",
    title: "Назва блоку",
    description: "Хмарка тепер завжди буде видима всередині блоку.",
    colors: ['#3b82f6', '#8b5cf6', '#22c55e'],
    blockColor: "#111827"
  }
];

const blocks = [
  {
    leftColor: '#22c55e',
    rightColor: '#3b82f6'
  },
  {
    leftColor: '#f97316',
    rightColor: '#6366f1'
  },
  {
    leftColor: '#10b981',
    rightColor: '#ef4444'
  },
  
]
</script>

<template>
  <HeroSECComponent
    title="Кухні"
    buttonText="Переглянути каталог"
    buttonLink="/catalog"
    section="kitchen"
  />

  <InformationCards :cards="cards"/>
  <TextTeclolojig
title="Наші технології"
text="Новий текст який буде відображатисьоровррвошщфраграшгіотаі аігшаніаолі а цгнапе на цна цац ащц а9шг ора ріапі аеіп аігра іао арміма. ащі азіщд лоіра ф ш фн фшщг щфвофв фщвв ге амри фшщв 8ф9ш 9в 0цв фов фвлф в фвфв фшлво фзщвш9щв 9фгвфв фв фвамв вв ф87в вци у0й уйу й муй йуй у98нйу7г йц87уе йцру йшгнуп н йгп"
/>

<BeforAfterSecContainer
title="Технології"
:items="blocks"/>

<PortofolioSec class="tt"/>
</template>

<style scoped>
.tt{
  margin-bottom: 70px;
}
</style>
