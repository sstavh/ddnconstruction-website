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

    <!-- Kitchen Service -->
    <PortfolioContainer
      id="portfolio-kitchen"
      title="Kitchen Service"
      service-slug="kitchen"
      text="We design and renovate kitchens with premium materials and precise craftsmanship. From layout planning to final installation — every detail matters."
    />

    <!-- Bathroom -->
    <PortfolioContainer
      id="portfolio-bathroom"
      title="Bathroom"
      service-slug="bathroom"
      text="Complete bathroom renovations: tile work, plumbing fixtures, waterproofing, and modern finishes. We transform bathrooms into relaxing, functional spaces."
    />

    <!-- Tiles -->
    <PortfolioContainer
      id="portfolio-tiles"
      title="Tiles"
      service-slug="tiles"
      text="Expert tile installation for floors, walls, and backsplashes. We work with all tile types — ceramic, porcelain, natural stone — with precision and care."
    />

    <!-- Spackling / Painting -->
    <PortfolioContainer
      id="portfolio-painting"
      title="Spackling / Painting"
      service-slug="painting"
      text="Smooth, flawless wall preparation and professional painting. We deliver crisp lines, even coats, and lasting results for any interior or exterior surface."
    />

    <!-- Electrical Work -->
    <PortfolioContainer
      id="portfolio-electric"
      title="Electrical Work"
      service-slug="electric"
      text="Safe and code-compliant electrical installations, upgrades, and repairs. Our licensed electricians handle everything from panel upgrades to lighting design."
    />

    <!-- Plumbing -->
    <PortfolioContainer
      id="portfolio-plumbing"
      title="Plumbing"
      service-slug="plumbing"
      text="Reliable plumbing services including pipe installation, fixture replacement, and leak repairs. We keep your systems flowing efficiently and safely."
    />

    <!-- Video Portfolio -->
    <VideoPortfolio id="portfolio-video"/>
</template>

<style></style>
