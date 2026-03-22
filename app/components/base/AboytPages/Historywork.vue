<script lang="ts" setup></script>

<template>
    <section>
        <div class="container">
            <div class="historyWork-container">
                <div class="historyWork-container__box">
                    <h3 order: 1 data-aos="fade-up" class="historyWork-box__title">Іторія початку</h3>
                    <ul class="historyWork-ul">
                        <li class="historyWork-ul__li">
                            <div data-aos="fade-right" order: 2 class="test-img">
                            </div>
                            <div class="historyWork-li__box">
                                <h4 order: 2 data-aos="fade-up" class="historyWork-li">Лого про компонент</h4>
                                <p class="historyWork-li__text">текс про початок і про наступні етапи </p>
                            </div>
                            
                        </li>
                        <li class="historyWork-ul__li">
                            
                            <div  class="historyWork-li__box">
                                <h4 order: 3 data-aos="fade-up" class="historyWork-li">Лого про компонент</h4>
                                <p class="historyWork-li__text">текс про початок і про наступні етапи </p>
                            </div>
                            <div order: 3 data-aos="fade-right" class="test-img tt">
                            </div>
                            
                        </li>
                        <li class="historyWork-ul__li">
                            <div data-aos="fade-right" order: 4 class="test-img">
                            </div>
                            <div class="historyWork-li__box">
                                <h4 order: 4 data-aos="fade-up" class="historyWork-li">Лого про компонент</h4>
                                <p class="historyWork-li__text">текс про початок і про наступні етапи </p>
                            </div>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.historyWork-container{
    margin-top: 160px;
}



.historyWork-box__title{
    margin-bottom: 60px;    
    text-align: center;
}

.historyWork-ul{
 list-style: none;
}

.historyWork-ul__li{
    display: flex;  
    justify-content: center;
    margin-bottom: 120px;
    gap: 30px;
}


.test-img{
    background-color: chartreuse;
    width: 500px;
    height: 370px;
    margin-right: 80px;
}
.tt{
    margin-right: 0;
    margin-left: 90px;
}

.historyWork-li__box{
    margin-top: 100px;
}

.historyWork-li{
    margin-bottom: 15px;
}

.historyWork-li__text{
    font-size: var(--font-s-navigation);
}

 @media (max-width: 768px) {
    .historyWork-ul__li{
        gap: 10px;
    }

    .tt{
        margin-left: 20px;
    }

    .historyWork-li{
        font-size: var(--font-s-Mobalh4);
        font-weight: var( --font-w-h3);
    }
  }
  @media (max-width: 430px) {

  .historyWork-ul__li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 80px;
  }

  /* 🔥 ВАЖЛИВО: порядок */
  .test-img {
    order: 1;
  }

  .historyWork-li__box {
    order: 2;
    margin-top: 0;
    text-align: center;
  }

  /* РОЗМІР БЛОКУ */
  .test-img {
    width: 100%;
    max-width: 340px;
    height: 220px;
    margin: 0;
  }

  /* прибираємо старі зсуви */
  .tt {
    margin: 0;
  }

  .historyWork-li {
    margin-bottom: 6px;
    font-size: var(--font-s-Mobalh4);
  }

  .historyWork-li__text {
    font-size: var(--font-s-MobalText);
  }
}
</style>