<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const quantity = ref(1)

watch(() => props.product.id, () => {
  quantity.value = 1
})

const discountedPrice = computed(() => {
  return props.product.price - props.product.discount
})

const subtotal = computed(() => {
  return props.product.price * quantity.value
})

const total = computed(() => {
  return discountedPrice.value * quantity.value
})

const incrementQty = () => {
  if (quantity.value < props.product.stock) {
    quantity.value++
  }
}

const decrementQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleBuyNow = async () => {
  if (quantity.value <= props.product.stock) {
    await cartStore.addToCart(props.product, quantity.value)
    quantity.value = 1
  }
}

onMounted(() => {
  console.log(`ProductDetails.vue mounted for ID: ${props.product.id}`)
})

onUnmounted(() => {
  console.log(`ProductDetails.vue unmounted for ID: ${props.product.id}`)
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-brand-card p-6 rounded-lg shadow-sm text-brand-text">
    <div class="flex justify-center items-center bg-brand-bg p-4 rounded-xl aspect-square">
      <img :src="product.image" :alt="product.name" class="rounded-lg shadow-sm max-w-full max-h-64 object-cover" />
    </div>

    <div class="flex flex-col justify-between">
      <div>
        <span v-if="product.badge" class="inline-block bg-brand-text text-brand-card text-xs px-2 py-1 font-bold uppercase tracking-wider mb-3">
          {{ product.badge }}
        </span>
        <h1 class="text-3xl font-bold tracking-tight mb-2">{{ product.name }}</h1>
        <p class="text-gray-600 text-sm leading-relaxed mb-6">{{ product.description }}</p>
        
        <div class="flex flex-wrap gap-2 mb-6">
          <span v-for="(tag, index) in product.tags" :key="index" class="text-xs bg-brand-bg px-3 py-1 text-gray-800 tracking-wide font-medium">
            {{ tag }}
          </span>
        </div>

        <div class="flex items-baseline gap-4 mb-2">
          <span class="text-2xl font-bold">${{ discountedPrice }}</span>
          <span v-if="product.discount > 0" class="text-sm text-gray-400 line-through">${{ product.price }}</span>
        </div>
        <span class="text-xs text-gray-400 font-medium tracking-wide block mb-6">Available Items in Stock: {{ product.stock }}</span>
      </div>

      <div class="space-y-4">
        <div v-if="product.stock > 0" class="bg-brand-bg p-4 rounded border border-gray-100 space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-500">Select Quantity:</span>
            <div class="flex items-center border border-gray-300 rounded bg-brand-card">
              <button @click="decrementQty" class="px-3 py-1 text-sm font-bold hover:bg-gray-100 transition-colors">-</button>
              <span class="px-4 text-xs font-mono font-bold text-gray-900">{{ quantity }}</span>
              <button @click="incrementQty" class="px-3 py-1 text-sm font-bold hover:bg-gray-100 transition-colors">+</button>
            </div>
          </div>
          
          <div class="border-t border-gray-200 pt-2 flex flex-col gap-1 text-[11px] uppercase tracking-wide font-medium text-gray-600">
            <div class="flex justify-between">
              <span>Subtotal (Before Discount):</span>
              <span class="font-bold font-mono">${{ subtotal }}</span>
            </div>
            <div class="flex justify-between text-brand-text text-xs font-bold">
              <span>Total Bill (Net Price):</span>
              <span class="font-bold font-mono text-sm">${{ total }}</span>
            </div>
          </div>
        </div>

        <div>
          <div v-if="product.stock === 0" class="badge badge-error gap-2 mb-2 rounded-none text-white font-semibold text-xs tracking-wider uppercase px-3 py-2">
            Out of Stock
          </div>
          <button 
            @click="handleBuyNow"
            class="btn w-full rounded-none tracking-widest uppercase text-sm font-medium transition-all"
            :class="product.stock > 0 ? 'bg-brand-text text-brand-card hover:bg-gray-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
            :disabled="product.stock === 0"
          >
            {{ product.stock > 0 ? 'Buy Now' : 'Sold Out' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>