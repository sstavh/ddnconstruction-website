<script lang="ts" setup>
console.log("good work Reviews");
import ReviewsCompTest from '~/components/ui/ReviewsCompTest.vue';
import ReviewsButtonTest from '~/components/ui/ReviewsButtonTest.vue';
const reviews: Review[] = [
  {
    id: 1,
    name: 'Іваненко Олена',
    rating: 5,
    text: 'Дуже задоволена результатом.',
    photo: '/images/clients/1.jpg',
    avatarColor: '#f97316',
    workPhoto: '/images/works/1.jpg',
    workFallbackColor: '#374151',
  },
  {
    id: 2,
    name: 'Петренко Андрій',
    rating: 4,
    text: 'Все чудово, рекомендую.',
    photo: '/images/clients/2.jpg',
    avatarColor: '#3b82f6',
    workPhoto: '/images/works/2.jpg',
    workFallbackColor: '#374151',
  },
  {
    id: 3,
    name: 'Шевченко Марія',
    rating: 5,
    text: 'Якість на висоті!',
    avatarColor: '#22c55e',
    workPhoto: '/images/works/3.jpg',
    workFallbackColor: '#374151',
  },
    {
        id: 4,
        name: 'Ковальчук Сергій',
        rating: 3,
        text: 'Все добре, але можна було б краще.',
        photo: '/images/clients/4.jpg',
        avatarColor: '#eab308',
        workPhoto: '/images/works/4.jpg',
        workFallbackColor: '#374151',
    },
    {
        id: 5,
        name: 'Григоренко Оксана',
        rating: 5,
        text: 'Неймовірно задоволена результатом!',
        photo: '/images/clients/5.jpg',
        avatarColor: '#8b5cf6',
        workPhoto: '/images/works/5.jpg',
        workFallbackColor: '#374151',
    },
    {
        id: 6,
        name: 'Мельник Віктор',
        rating: 4,
        text: 'Все чудово, рекомендую!',
        photo: '/images/clients/6.jpg',
        avatarColor: '#f43f5e',
        workPhoto: '/images/works/6.jpg',
        workFallbackColor: '#374151',
    },
    {
        id: 7,
        name: 'Сидоренко Наталія',
        rating: 5,
        text: 'Якість на найвищому рівні!',
        avatarColor: '#10b981',
        workPhoto: '/images/works/7.jpg',
        workFallbackColor: '#374151',
    },
    {
        id: 8,
        name: 'Кравченко Олег',
        rating: 5,
        text: 'Все відповідає очікуванням!',
        avatarColor: '#0ea5e9',
        workPhoto: '/images/works/8.jpg',
        workFallbackColor: '#374151',
    },
    {
        id: 9,
        name: 'Лисенко Ірина',
        rating: 4,
        text: 'Дуже задоволена результатом!',
        photo: '/images/clients/9.jpg',
        avatarColor: '#f59e0b',
        workPhoto: '/images/works/9.jpg',
        workFallbackColor: '#374151',
    },
    {
        id: 10,
        name: 'Бондаренко Сергій',
        rating: 5,
        text: 'Рекомендую всім!',
        photo: '/images/clients/10.jpg',
        avatarColor: '#3b82f6',
        workPhoto: '/images/works/10.jpg',
        workFallbackColor: '#374151',
    },  
]
</script>

<template>
    <section>
        <div class="container">
            <div class="reviews-container__box">
                <div class="reviews-box">
                    <h2 class="reviews-box__title">Відгуки клієнтів</h2>
                    <div class="reviews-box__subtitle">
                        <div class="box__subtitle">
                        <p class="reviews-box__text">Залишіть свій відгук про нашу роботу.  </p>
                        <ReviewsButtonTest />  
                    </div>
                         <ReviewsCompTest   
      :reviews="reviews"
      :visible-count="3"
      :interval-ms="30000"
      :transition-ms="450"
    />
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>








.reviews-box__title{
    font-size: var(--font-s-title);
    font-weight: 700;
    text-align: center;
    margin-top: 75px;
}

.box__subtitle{
    display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
}

.reviews-box__subtitle{ 
    text-align: center;
}

.reviews-box__text{
    font-size: var(--font-s-button);
    margin-left: 28%;
}
</style>