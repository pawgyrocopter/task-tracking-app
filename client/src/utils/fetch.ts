const API_URL = import.meta.env.VITE_API_URL

export async function customFetch(endpoint: string, options: RequestInit = {}) {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    }

    try {
        const response = await fetch(API_URL + endpoint, config)

        if (!response.ok) {
            const error = await response.json()
            console.error('Error:', error)
            throw new Error(error.message || 'An error occurred')
        }

        return await response.json()
    } catch (error) {
        console.error('Fetch error:', error)
        throw error
    }
}
