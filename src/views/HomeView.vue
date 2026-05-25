<script setup>
import { onMounted, onUnmounted } from 'vue'
import CarouselBanner from '@/components/CarouselBanner.vue'
import ProductCard from '@/components/ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true
  }
})

onMounted(() => {
  console.log("HomeView mounted - all products loaded")
})

onUnmounted(() => {
  console.log("HomeView unmounted")
})
</script>

<template>
  <div>
    <CarouselBanner />
    <h2 class="text-lg font-bold uppercase tracking-widest mb-6 text-gray-800 border-b pb-2">Our Collection</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <ProductCard v-for="item in products" :key="item.id" :product="item" />
    </div>
  </div>
</template>