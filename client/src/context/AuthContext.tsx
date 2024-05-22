import { createContext, useContext, useState } from 'react'

type AuthContextType = {
    isAuthenticated: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = () => setIsAuthenticated(true)
    const logout = () => setIsAuthenticated(false)

    console.log('isAuthenticated', isAuthenticated)

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
