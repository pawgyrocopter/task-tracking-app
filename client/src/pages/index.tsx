import { useAuth } from '@/context/AuthContext'
import Login from '@/features/login'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
    const { isAuthenticated } = useAuth()

    return (
        <div className="flex flex-col justify-center items-center h-full">
            {!isAuthenticated ? <Login /> : <Navigate to={'/projects'} />}
        </div>
    )
}

export default HomePage
