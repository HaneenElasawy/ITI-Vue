import { ref } from 'vue'

export function useApi(baseUrl = 'http://localhost:3000') {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const getAll = async (resource) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${baseUrl}/${resource}`)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const update = async (resource, id, payload) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${baseUrl}/${resource}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        throw new Error('Failed to update resource')
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    getAll,
    update
  }
}