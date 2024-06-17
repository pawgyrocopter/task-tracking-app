const API_URL = import.meta.env.VITE_API_URL

export async function customFetch<ReturnType>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ReturnType> {
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

export async function customFetchWithCredentials<ReturnType>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ReturnType> {
    const token = localStorage.getItem('accessToken')

    if (!token) {
        throw new Error('no token')
    }

    const config = {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return customFetch<ReturnType>(endpoint, config)
}
