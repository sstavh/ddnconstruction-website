<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
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
</template>

<style scoped></style>
