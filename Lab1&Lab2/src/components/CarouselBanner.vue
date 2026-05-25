<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log("CarouselBanner.vue mounted")
})

onUnmounted(() => {
  console.log("CarouselBanner.vue unmounted")
})
</script>

<template>
  <div class="carousel w-full h-56 rounded-none shadow-sm overflow-hidden mb-8 bg-brand-text">
    <div id="slide1" class="carousel-item relative w-full flex items-center justify-center bg-cover bg-center text-brand-card" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop');">
      <div class="text-center px-4">
        <h2 class="text-2xl font-bold tracking-widest uppercase mb-1">New Minimalist Season</h2>
        <p class="text-xs tracking-wide text-gray-200">Explore premium aesthetics built for comfort</p>
      </div>
    </div>
  </div>
</template>