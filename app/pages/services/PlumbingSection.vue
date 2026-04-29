<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const plumbingCards = [
  { logo: "/logo.png", title: "Pipe Installation", description: "New plumbing pipe runs for kitchens, bathrooms, and whole-home systems.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Fixture Replacement", description: "Faucets, sinks, toilets, and showers swapped out quickly and cleanly.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Leak Repair", description: "Fast diagnosis and repair of leaks before they cause serious damage.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Drain Cleaning", description: "Professional drain clearing and hydro-jetting for stubborn blockages.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Water Heaters", description: "Water heater installation, replacement, and maintenance.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Full Renovations", description: "Complete plumbing rough-in for full bathroom and kitchen remodels.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827" },
];

const beforeAfterBlocks = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'plumbingBefore1', rightSection: 'plumbingAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'plumbingBefore2', rightSection: 'plumbingAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'plumbingBefore3', rightSection: 'plumbingAfter3' },
];
</script>

<template>
  <HeroSECComponent
    title="Plumbing"
    buttonText="Переглянути каталог"
    buttonLink="/catalog"
    section="plumbing"
  />

  <InformationCards :cards="plumbingCards"/>

  <TextTeclolojig
    title="Наші технології"
    text="Ми використовуємо сучасні матеріали та обладнання для забезпечення найвищої якості кожного проекту. Від планування до фінального результату — кожен крок продуманий."
  />

  <BeforAfterSecContainer
    title="Before & After — Сантехніка"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
