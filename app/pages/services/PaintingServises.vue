<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const paintingCards = [
  { logo: "/logo.png", title: "Surface Prep", description: "Thorough sanding, priming, and patching before any paint is applied.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Interior Painting", description: "Clean, even coats of interior paint — walls, ceilings, trim, and more.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Exterior Painting", description: "Weather-resistant exterior paint applied with professional-grade equipment.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Spackling & Skim Coat", description: "Smooth wall restoration — filling cracks, holes, and imperfections.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Texture Finishes", description: "Custom textures — orange peel, knockdown, venetian plaster, and more.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Color Consultation", description: "Expert color selection to match your vision and space.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827" },
];

const beforeAfterBlocks = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'paintingBefore1', rightSection: 'paintingAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'paintingBefore2', rightSection: 'paintingAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'paintingBefore3', rightSection: 'paintingAfter3' },
];
</script>

<template>
  <HeroSECComponent
    title="Spackling / Painting"
    buttonText="Переглянути каталог"
    buttonLink="/catalog"
    section="painting"
  />

  <InformationCards :cards="paintingCards"/>

  <TextTeclolojig
    title="Наші технології"
    text="Ми використовуємо сучасні матеріали та обладнання для забезпечення найвищої якості кожного проекту. Від планування до фінального результату — кожен крок продуманий."
  />

  <BeforAfterSecContainer
    title="Before & After — Шпаклівка / Фарбування"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
