import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to={'/'} />
}

export default ProtectedRoute
