<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
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
  />

  <InformationCards :cards="cards"/>
  <TextTeclolojig
title="Наші технології"
text="Новий текст який буде відображатись"
/>

<BeforAfterSecContainer
title="Технології"
:items="blocks"/>
</template>

<style scoped></style>
