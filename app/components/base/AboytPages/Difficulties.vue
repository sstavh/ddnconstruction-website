<script lang="ts" setup></script>

<template>
    <section>
        <div class="container">
            <div class="diffic-container">
                <div class="diffic-container__box">
                    <h3 data-aos="fade-up" order: 1 class="diffic-box__tile">Трудності в роботі</h3>
                    <p class="diffic-box__pidtext">текст досить опширний і з хороши змістом і роботою агігаішгапінанімаіпам іп гапінап іап інамііма вшф8нвф98 вфва фвфв вф8 вшрвгфрв фрв ф8вн фвнрв гшфрвгшвфшгвфгв фав фнвп гірв ф78вф98в ф98вфврфв мимфрпвф </p>

                    <ul class="diffic-box__ul">
                        <li data-aos="fade-right" order: 2 class="diffic-ul__li">
                            <div class="test-img"></div>
                            <h4>Імя прізвище</h4>
                            <p class="diffic-li-text">коротка спіціальність</p>
                        </li>
                        <li data-aos="fade-up" order: 3 class="diffic-ul__li">
                            <div class="test-img"></div>
                            <h4>Імя Прізвище</h4>
                            <p class="diffic-li-text">коротка спіціальність</p>
                        </li>
                        <li data-aos="fade-down" order: 2 class="diffic-ul__li tt">
                            <div class="test-img"></div>
                            <h4>Імя прізвище</h4>
                            <p class="diffic-li-text">коротка спіціальність</p>
                        </li>
                    </ul>
                </div> 
            </div>
        </div>
    </section>
</template>
<style scoped>/* ====== BASE (твій, без змін) ====== */
.diffic-container{
    margin-top: 160px;
}

.diffic-box__tile{
    text-align: center;
    margin-bottom: 50px;
}

.diffic-box__pidtext{
    padding-left: 5%;
    padding-right: 5%;
    text-align: center;
    margin-bottom: 100px;
}

.diffic-box__ul{
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    list-style: none;
    gap: 30px;
}

.diffic-ul__li{
    margin-right: 80px;
}

.tt{
    margin-right: 0;
}

.test-img{
    background-color: brown;
    width: 270px;
    height: 350px;
    margin-bottom: 25px;
}

.diffic-li-text{
    margin-top: 5px;
    color: var(--color-praymeri-blekText);
    font-size: var(--font-s-navigation);
}


/* ====== 1024px ====== */
@media (max-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .diffic-container {
    margin-top: 120px;
  }

  .diffic-box__ul {
    gap: 20px;
  }

  .diffic-ul__li {
    margin-right: 40px;
  }

  .test-img {
    width: 220px;
    height: 300px;
  }
}


/* ====== 768px ====== */
@media (max-width: 768px) {
  .container {
    max-width: 720px;
  }

  .diffic-box__ul {
    flex-wrap: wrap;
    gap: 20px;
  }

  .diffic-ul__li {
    margin-right: 0;
    width: calc(50% - 10px);
  }

  .test-img {
    width: 100%;
    height: 260px;
  }

  .diffic-box__pidtext {
    margin-bottom: 60px;
  }
}


/* ====== 430px ====== */
@media (max-width: 430px) {
  .container {
    max-width: 360px;
  }

  .diffic-container {
    margin-top: 80px;
  }

  .diffic-box__ul {
    flex-direction: column;
    gap: 25px;
  }

  .diffic-ul__li {
    width: 100%;
  }

  .test-img {
    height: 220px;
  }

  .diffic-box__tile {
    margin-bottom: 30px;
  }

  .diffic-box__pidtext {
    margin-bottom: 40px;
  }

  p {
    font-size: var(--font-s-MobalText);
  }
}</style>


