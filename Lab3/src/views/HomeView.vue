<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import CarouselBanner from '@/components/CarouselBanner.vue'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()

onMounted(async () => {
  console.log("HomeView mounted")
  await productStore.fetchProducts()
})

onUnmounted(() => {
  console.log("HomeView unmounted")
})
</script>

<template>
  <div>
    <CarouselBanner />
    <h2 class="text-lg font-bold uppercase tracking-widest mb-6 text-gray-800 border-b pb-2">Our Collection</h2>
    
    <div v-if="productStore.loading" class="text-center py-12 text-sm font-medium tracking-widest uppercase text-gray-400">
      Loading Collection...
    </div>

    <div v-else-if="productStore.error" class="text-center py-12 text-sm font-medium tracking-widest uppercase text-red-500">
      Error: {{ productStore.error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <ProductCard v-for="item in productStore.products" :key="item.id" :product="item" />
    </div>
  </div>
</template>