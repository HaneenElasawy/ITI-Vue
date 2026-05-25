<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['buy'])

const quantity = ref(1)

watch(() => props.product.id, () => {
  quantity.value = 1
})

const discountedPrice = computed(() => {
  return props.product.price - props.product.discount
})

const subtotalPrice = computed(() => {
  return discountedPrice.value * quantity.value
})

const increaseQty = () => {
  if (quantity.value < props.product.stock) {
    quantity.value++
  }
}

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const triggerBuy = () => {
  if (props.product.stock >= quantity.value) {
    emit('buy', props.product.id, quantity.value)
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

      <div>
        <div v-if="product.stock === 0" class="badge badge-error gap-2 mb-2 rounded-none text-white font-semibold text-xs tracking-wider uppercase px-3 py-2">
          Out of Stock
        </div>
        
        <div v-if="product.stock > 0" class="flex items-center justify-between gap-4 mb-4 bg-brand-bg p-3 rounded-md border border-gray-100">
          <div class="flex items-center gap-3">
            <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity:</span>
            <div class="flex items-center border border-brand-text bg-brand-card">
              <button @click="decreaseQty" class="px-2.5 py-1 font-bold hover:bg-gray-100 transition-colors text-brand-text">-</button>
              <span class="px-3 font-semibold text-sm w-8 text-center text-brand-text">{{ quantity }}</span>
              <button @click="increaseQty" class="px-2.5 py-1 font-bold hover:bg-gray-100 transition-colors text-brand-text">+</button>
            </div>
          </div>
          
          <div class="text-right">
            <span class="text-xs text-gray-400 block">Subtotal</span>
            <span class="text-sm font-bold text-brand-text">${{ subtotalPrice }}</span>
          </div>
        </div>

        <button 
          @click="triggerBuy"
          class="btn w-full rounded-none tracking-widest uppercase text-sm font-medium transition-all"
          :class="product.stock > 0 ? 'bg-brand-text text-brand-card hover:bg-gray-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
          :disabled="product.stock === 0"
        >
          {{ product.stock > 0 ? 'Buy Now' : 'Sold Out' }}
        </button>
      </div>
    </div>
  </div>
</template>