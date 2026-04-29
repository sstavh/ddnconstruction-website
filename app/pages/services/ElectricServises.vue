<template>
  <section class="contactCard">

    <div class="contactList">
      <a class="contactItem" :href="`tel:${phoneHref}`">
        <div class="label">Phone</div>
        <div class="value">{{ phone }}</div>
      </a>

      <a class="contactItem" :href="`mailto:${email}`">
        <div class="label">Email</div>
        <div class="value">{{ email }}</div>
      </a>
    </div>

    <div class="socialBlock">
      <div class="socialRow">

        <a :href="socials.tiktok" target="_blank" class="socialBtn tg">
          <img :src="tiktokIcon" alt="TikTok" class="socialIcon" />
        </a>

        <a :href="socials.instagram" target="_blank" class="socialBtn ig">
          <img :src="instagramIcon" alt="Instagram" class="socialIcon" />
        </a>

        <a :href="socials.facebook" target="_blank" class="socialBtn fb">
          <img :src="facebookIcon" alt="Facebook" class="socialIcon" />
        </a>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import tiktokIcon from "~/assets/icon/free-icon-tiktok-3669950.png"
import instagramIcon from "~/assets/icon/free-icon-instagram-1384015.png"
import facebookIcon from "~/assets/icon/free-icon-facebook-circular-logo-20673.png"

const phone = "+12242620179"
const email = "ddnconstruction1111@gmail.com"

const phoneHref = phone.replace(/[^\d+]/g, "")

const socials = {
  tiktok: "https://www.tiktok.com/",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/"
}
</script>

<style scoped>
.contactCard {
  max-width: 240px;
}

.contactList {
  display: grid;
  gap: 14px;
  margin-bottom: 18px;
}

.contactItem {
  color: var(--color-praymeri-light);
  text-decoration: none;
  transition: 0.25s ease;
}

.contactItem:hover {
  opacity: 0.8;
}

.label {
  font-size: 16px;
  color: #ffffff;
}

.value {
  font-size: 18px;
  font-weight: 600;
}

.socialRow {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.socialBtn {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;

  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  text-decoration: none;

  transition: 0.25s ease;
}

.socialBtn:hover {
  transform: translateY(-3px) scale(1.05);
}

.socialIcon {
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  object-fit: contain;
  display: block;
}

.tg {
  background: #373737;
}

.ig {
  background: #E1306C;
}

.fb {
  background: #1877F2;
}

.tg:hover {
  background: #222;
}

.ig:hover {
  background: #c1255d;
}

.fb:hover {
  background: #155db8;
}

@media (max-width: 430px) {
  .contactCard {
    max-width: 100%;
  }

  .socialBtn {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }

  .socialIcon {
    width: 20px;
    height: 20px;
  }
}
</style>