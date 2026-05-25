<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductDetails from '@/components/ProductDetails.vue'
import ProductCard from '@/components/ProductCard.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['buy'])

const route = useRoute()
const productId = computed(() => Number(route.params.id))

const currentProduct = computed(() => {
  return props.products.find(p => p.id === productId.value)
})

const relatedProducts = computed(() => {
  return props.products.filter(p => p.id !== productId.value)
})

const handleBuy = (id, qty) => {
  emit('buy', id, qty)
}

onMounted(() => {
  console.log(`ProductView mounted for ID: ${productId.value}`)
})

onUnmounted(() => {
  console.log(`ProductView unmounted for ID: ${productId.value}`)
})
</script>

<template>
  <div v-if="currentProduct">
    <ProductDetails :product="currentProduct" @buy="handleBuy" />
    
    <div class="mt-16">
      <h2 class="text-lg font-bold tracking-widest uppercase mb-6 text-gray-800 border-b pb-2">Explore Other Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <ProductCard v-for="item in relatedProducts" :key="item.id" :product="item" />
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12 text-gray-500 font-medium">
    Product not found.
  </div>
</template>