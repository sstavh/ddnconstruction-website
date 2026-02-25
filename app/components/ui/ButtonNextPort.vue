<script setup lang="ts">
console.log("button Good Work");

</script>

<template>
    <div class="container">
        <button class="button-next">
            <div>Натискай щоб пореглянути більше!!!</div>
            <div>></div>
        
        </button>
    </div>
</template>
<style scoped>
.button-next {
    margin-top: -30px;
    width: 1170px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 35px;
    background-color: #007BFF;
    color: var( --color-praymeri-light);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px; 
    transition: all 0.3s ease;
} 

.button-next:hover {
    background-color: #0068d6;
}
</style>