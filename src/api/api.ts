// src/api/api.ts
const API_BASE_URL = 'https://new-backend.unistory.app/api'

export async function fetchAllUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/data`)
    if (!response.ok) {
      throw new Error('Failed to fetch users.')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}
