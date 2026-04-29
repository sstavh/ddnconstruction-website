<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const bathroomCards = [
  { logo: "/logo.png", title: "Design & Layout", description: "Custom bathroom design tailored to your space and preferences.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Tile Installation", description: "Premium tile work for floors, walls, and shower surrounds.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Plumbing Fixtures", description: "Modern tubs, showers, and vanities installed with precision.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Waterproofing", description: "Industry-grade waterproofing to protect your renovation long-term.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Lighting", description: "Recessed lighting, vanity lights, and exhaust fans installed safely.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Final Finishing", description: "Grout sealing, caulking, and all finishing touches included.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827" },
];

const beforeAfterBlocks = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'bathroomBefore1', rightSection: 'bathroomAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'bathroomBefore2', rightSection: 'bathroomAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'bathroomBefore3', rightSection: 'bathroomAfter3' },
];
</script>

<template>
  <HeroSECComponent
    title="Bathroom Renovation"
    buttonText="Переглянути каталог"
    buttonLink="/catalog"
    section="bathroom"
  />

  <InformationCards :cards="bathroomCards"/>

  <TextTeclolojig
    title="Наші технології"
    text="Ми використовуємо сучасні матеріали та обладнання для забезпечення найвищої якості кожного проекту. Від планування до фінального результату — кожен крок продуманий."
  />

  <BeforAfterSecContainer
    title="Before & After — Ванні кімнати"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
