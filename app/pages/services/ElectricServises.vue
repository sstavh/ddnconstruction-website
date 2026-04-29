<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const electricCards = [
  { logo: "/logo.png", title: "Panel Upgrades", description: "Electrical panel replacement and capacity upgrades for modern homes.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Wiring & Rewiring", description: "Full or partial home rewiring done safely and to code.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Outlet & Switch Install", description: "New outlets, switches, and USB ports installed anywhere in your home.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Lighting Systems", description: "Recessed lights, chandeliers, under-cabinet lighting — we do it all.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Safety Inspections", description: "Full electrical safety inspections with detailed reports.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Code Compliance", description: "All work done to local code — permits, inspections, certificates.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827" },
];

const beforeAfterBlocks = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'electricBefore1', rightSection: 'electricAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'electricBefore2', rightSection: 'electricAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'electricBefore3', rightSection: 'electricAfter3' },
];
</script>

<template>
  <HeroSECComponent
    title="Electrical Work"
    buttonText="Переглянути каталог"
    buttonLink="/catalog"
    section="electric"
  />

  <InformationCards :cards="electricCards"/>

  <TextTeclolojig
    title="Наші технології"
    text="Ми використовуємо сучасні матеріали та обладнання для забезпечення найвищої якості кожного проекту. Від планування до фінального результату — кожен крок продуманий."
  />

  <BeforAfterSecContainer
    title="Before & After — Електрика"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
