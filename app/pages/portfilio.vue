 <script lang="ts" setup>
import ButtonNAvigation from '../components/base/PortfolioPage/ButtonNAvigation.vue';
import GeneralHeroPortfolio from '../components/base/PortfolioPage/GeneralHeroPortfolio.vue';
import HeroPortfolio from '../components/base/PortfolioPage/HeroPortfolio.vue';
import VideoPortfolio from '../components/base/PortfolioPage/VideoPortfolio.vue';
import PortfolioContainer from '../components/base/PortfolioPage/PortfolioContainer.vue';
</script>

<template>
    <HeroPortfolio/>
    <GeneralHeroPortfolio/>
    <ButtonNAvigation/>

    <!-- Kitchen Installation -->
    <PortfolioContainer
      id="portfolio-kitchen"
      title="Kitchen Installation"
      service-slug="kitchen"
      text="We provide kitchen cabinet installation, backsplash tile work, countertop installation, and detailed finishing. Clean work and attention to every detail."
    />

    <!-- Bathrooms & Showers -->
    <PortfolioContainer
      id="portfolio-bathroom"
      title="Bathrooms & Showers"
      service-slug="bathroom"
      text="We create modern and functional bathrooms with attention to every detail. Full remodeling: tile work, walk-in showers, plumbing, vanities, and lighting."
    />

    <!-- Tile Work -->
    <PortfolioContainer
      id="portfolio-tiles"
      title="Tile Work"
      service-slug="tiles"
      text="Tile installation for any size and style. From small tiles to large formats, we ensure clean work, strong results, and a flawless finish every time."
    />

    <!-- Interior Work -->
    <PortfolioContainer
      id="portfolio-painting"
      title="Interior Work"
      service-slug="painting"
      text="Full interior solutions, from flooring to final details — delivered with precision and care."
    />

    <!-- Fireplace Projects -->
    <PortfolioContainer
      id="portfolio-fireplace"
      title="Fireplace Projects"
      service-slug="fireplace"
      text="From classic stone fireplaces to modern feature walls, we create spaces that feel warm, elegant, and built to last. Every project is tailored to your style."
    />

    <!-- Luxury Living -->
    <PortfolioContainer
      id="portfolio-luxury"
      title="Luxury Living"
      service-slug="luxury"
      text="From demolition to final details — we take care of everything. Clean work, reliable timelines, and results you can trust."
    />

    <!-- Video Portfolio -->
    <VideoPortfolio id="portfolio-video"/>
</template>

<style></style>
