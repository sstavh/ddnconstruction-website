<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const electricCards = [
  { logo: "/logo.png", title: "Construction Quality", description: "We use proven materials and follow all technological standards.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827", section: "infoBlock1" },
  { logo: "/logo.png", title: "Clear Deadlines", description: "We work according to an agreed schedule and complete projects on time.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827", section: "infoBlock2" },
  { logo: "/logo.png", title: "Transparent Pricing", description: "No hidden fees — you know the project budget from the start.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827", section: "infoBlock3" },
  { logo: "/logo.png", title: "Experienced Team", description: "Our specialists have practical experience with projects of various levels of complexity.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827", section: "infoBlock4" },
  { logo: "/logo.png", title: "Work Guarantee", description: "We are confident in the quality of our work and provide a warranty on all completed services.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827", section: "infoBlock5" },
  { logo: "/logo.png", title: "Personalized Approach", description: "We select solutions based on your needs and budget.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827", section: "infoBlock6" },
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
    buttonText="Contact"
    buttonLink="/catalog"
    section="electric"
  />

  <InformationCards :cards="electricCards"/>

  <TextTeclolojig
    title="Our technologies"
    text="We deliver safe, code-compliant electrical installations for residential and commercial projects of any scale. Our licensed electricians work with precision and care, ensuring every connection, panel, and circuit is installed to the highest standard.<br/><br/>From full rewiring and panel upgrades to outlet installation and lighting design, we handle it all with meticulous attention to safety and detail. Every project is planned thoroughly before execution to minimize disruption and ensure long-term reliability.<br/><br/>We stay current with modern electrical standards and use only certified materials, giving you peace of mind that your home or business is powered safely, efficiently, and built to last."
    buttonText="View Portfolio"
    buttonLink="/portfilio"
  />

  <BeforAfterSecContainer
    title="Before & After — Electrical Work"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
