import { AuthTokens, refresh } from '@/services/AuthService'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
    isAuthenticated: boolean
    login: (tokens: AuthTokens) => void
    logout: () => void
    refreshAccessToken: () => Promise<void>
    accessToken: string | null
    refreshToken: string | null
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken')
        const storedRefreshToken = localStorage.getItem('refreshToken')
        if (storedAccessToken && storedRefreshToken) {
            setAccessToken(storedAccessToken)
            setRefreshToken(storedRefreshToken)
            setIsAuthenticated(true)
        }
    }, [])

    const login = (tokens: AuthTokens) => {
        setAccessToken(tokens.token)
        setRefreshToken(tokens.refreshToken)
        localStorage.setItem('accessToken', tokens.token)
        localStorage.setItem('refreshToken', tokens.refreshToken)
        setIsAuthenticated(true)
    }

    const logout = () => {
        setAccessToken(null)
        setRefreshToken(null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsAuthenticated(false)
    }

    const refreshAccessToken = async () => {
        if (!refreshToken) {
            logout()
            throw new Error('No refresh token available')
        }
        try {
            const newTokens = await refresh(refreshToken)
            setAccessToken(newTokens.token)
            setRefreshToken(newTokens.refreshToken)
            localStorage.setItem('accessToken', newTokens.token)
            localStorage.setItem('refreshToken', newTokens.refreshToken)
        } catch (error) {
            logout()
            throw new Error('Failed to refresh access token')
        }
    }

    console.log('isAuthenticated', isAuthenticated)

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                refreshAccessToken,
                accessToken,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
