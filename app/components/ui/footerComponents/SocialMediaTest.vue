<template>
  <section class="contactCard">

    <div class="contactList">
      <a class="contactItem" :href="`tel:${phoneHref}`">
        <div class="label">Телефон</div>
        <div class="value">{{ phone }}</div>
      </a>

      <a class="contactItem" :href="`mailto:${email}`">
        <div class="label">Пошта</div>
        <div class="value">{{ email }}</div>
      </a>
    </div>

    <div class="socialBlock">
      <div class="socialRow">
        <a :href="socials.telegram" target="_blank" class="socialBtn tg">
          T
        </a>

        <a :href="socials.instagram" target="_blank" class="socialBtn ig">
          I
        </a>

        <a :href="socials.facebook" target="_blank" class="socialBtn fb">
          F
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const phone = "+380 67 123 45 67"
const email = "info@example.com"

const phoneHref = phone.replace(/[^\d+]/g, "")

const socials = {
  telegram: "https://t.me/your_username",
  instagram: "https://instagram.com/your_username",
  facebook: "https://facebook.com/your_page"
}
</script>

<style scoped>
.contactCard {
  max-width: 200px;
}



.contactList {
  display: grid;
  gap: 14px;
  margin-bottom: 15px;
}

.contactItem {
  color: var(--color-praymeri-light);
  text-decoration: none;
  transition: 0.2s ease;
}

.contactItem:hover {
  color: rgb(225, 223, 223);
}

.label {
  font-size: 17px;
  color: #ffffff;
}

.value {
  font-size: 18px;
  font-weight: 600;
}

.socialBlock {
  display: grid;
  gap: 10px;
}

.socialTitle {
  font-size: 14px;
  color:  #ffffff;
}

.socialRow {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.socialBtn {
  padding: 10px 15px;
border-radius: 50%;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.tg {
  background: #229ED9;
}

.ig {
  background: #E1306C;
}

.fb {
  background: #1877F2;
}
.tg:hover {
  background: #1A7BB8;
}
.ig:hover {
  background: #C1275B;
}
.fb:hover {
  background: #155DB8;
}
</style>