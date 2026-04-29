<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const tilesCards = [
  { logo: "/logo.png", title: "Floor Tiling", description: "Precision tile installation for any floor type — ceramic, porcelain, natural stone.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Wall Tiling", description: "Expert wall tile installation for kitchens, bathrooms, and feature walls.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Backsplash", description: "Custom backsplash designs to match your kitchen or bathroom style.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Grout & Sealing", description: "Professional grouting and sealing for a durable, clean finish.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Substrate Prep", description: "Proper substrate leveling and waterproofing before any tile work.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Pattern Layouts", description: "Herringbone, subway, mosaic — any pattern you can imagine.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827" },
];

const beforeAfterBlocks = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'tilesBefore1', rightSection: 'tilesAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'tilesBefore2', rightSection: 'tilesAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'tilesBefore3', rightSection: 'tilesAfter3' },
];
</script>

<template>
  <HeroSECComponent
    title="Tile Installation"
    buttonText="Переглянути каталог"
    buttonLink="/catalog"
    section="tiles"
  />

  <InformationCards :cards="tilesCards"/>

  <TextTeclolojig
    title="Наші технології"
    text="Ми використовуємо сучасні матеріали та обладнання для забезпечення найвищої якості кожного проекту. Від планування до фінального результату — кожен крок продуманий."
  />

  <BeforAfterSecContainer
    title="Before & After — Плитка"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
