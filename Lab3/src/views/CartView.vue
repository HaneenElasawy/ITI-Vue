<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const name = ref('')
const address = ref('')

const isFormValid = computed(() => {
  return name.value.trim().length > 0 && address.value.trim().length > 0
})

const handleCheckout = () => {
  if (isFormValid.value) {
    cartStore.clearCart()
    name.value = ''
    address.value = ''
    alert('Purchase completed successfully!')
  }
}

onMounted(() => {
  console.log("CartView mounted")
})

onUnmounted(() => {
  console.log("CartView unmounted")
})
</script>

<template>
  <div class="bg-brand-card p-6 rounded-lg shadow-sm border border-gray-100 text-brand-text">
    <h1 class="text-xl font-bold uppercase tracking-widest mb-6 border-b pb-2">Your Studio Bag</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12 text-gray-400 text-xs uppercase tracking-wider font-medium">
      Your cart is empty
    </div>

    <div v-else>
      <div class="overflow-x-auto mb-8">
        <table class="table w-full text-xs uppercase tracking-wider">
          <thead>
            <tr class="border-b border-gray-100 text-gray-400 text-[10px]">
              <th class="py-3 text-left">Product</th>
              <th class="py-3 text-center">Price</th>
              <th class="py-3 text-center">Quantity</th>
              <th class="py-3 text-center">Subtotal</th>
              <th class="py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.items" :key="item.id" class="border-b border-gray-55 font-medium">
              <td class="py-4 flex items-center gap-3">
                <img :src="item.image" :alt="item.name" class="w-10 h-10 object-cover rounded-md bg-brand-bg" />
                <span class="font-bold text-gray-900">{{ item.name }}</span>
              </td>
              <td class="py-4 text-center">${{ item.price - item.discount }}</td>
              <td class="py-4 text-center font-bold">{{ item.quantity }}</td>
              <td class="py-4 text-center font-bold">${{ (item.price - item.discount) * item.quantity }}</td>
              <td class="py-4 text-right">
                <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 hover:text-red-700 font-bold tracking-widest text-[10px] uppercase transition-colors">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-col items-end gap-2 border-b border-gray-100 pb-6 mb-8">
        <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Total Bag Price</span>
        <span class="text-2xl font-bold text-brand-text">${{ cartStore.totalPrice }}</span>
        <button @click="cartStore.clearCart()" class="text-xs text-gray-500 underline hover:text-brand-text transition-colors mt-2 uppercase tracking-wide">
          Clear Entire Bag
        </button>
      </div>

      <div class="max-w-md bg-brand-bg p-6 rounded-md border border-gray-100">
        <h2 class="text-xs font-bold uppercase tracking-widest mb-4 text-gray-800">Checkout Information</h2>
        <form @submit.prevent="handleCheckout" class="space-y-4 text-left normal-case">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
            <input v-model="name" type="text" class="w-full bg-brand-card border border-gray-200 px-3 py-2 text-xs text-brand-text focus:outline-none focus:border-brand-text" placeholder="Haneen Elasawy" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Shipping Address</label>
            <input v-model="address" type="text" class="w-full bg-brand-card border border-gray-200 px-3 py-2 text-xs text-brand-text focus:outline-none focus:border-brand-text" placeholder="King Faisal Street, Giza" />
          </div>
          <button 
            type="submit" 
            class="w-full bg-brand-text text-brand-card text-xs font-bold uppercase tracking-widest py-3 mt-2 hover:bg-gray-900 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            :disabled="!isFormValid"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  </div>
</template>