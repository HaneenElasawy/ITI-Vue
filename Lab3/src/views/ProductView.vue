<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import ProductDetails from '@/components/ProductDetails.vue'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()
const productId = computed(() => route.params.id)

onMounted(async () => {
  console.log(`ProductView mounted for ID: ${productId.value}`)
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
})

const currentProduct = computed(() => {
  return productStore.getProductById(productId.value)
})

const relatedProducts = computed(() => {
  return productStore.products.filter(p => p.id != productId.value)
})
</script>

<template>
  <div>
    <div v-if="productStore.loading" class="text-center py-12 text-sm font-medium tracking-widest uppercase text-gray-400">
      Loading Product Information...
    </div>

    <div v-else-if="currentProduct">
      <ProductDetails :product="currentProduct" />
      
      <div class="mt-16">
        <h2 class="text-lg font-bold tracking-widest uppercase mb-6 text-gray-800 border-b pb-2">Explore Other Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ProductCard v-for="item in relatedProducts" :key="item.id" :product="item" />
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-550 font-medium">
      Product not found.
    </div>
  </div>
</template>