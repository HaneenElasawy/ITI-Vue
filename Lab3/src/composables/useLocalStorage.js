import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key)
  const initial = storedValue ? JSON.parse(storedValue) : defaultValue
  const state = ref(initial)

  watch(
    state,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )

  return state
}