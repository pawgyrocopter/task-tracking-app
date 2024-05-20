import { useAuth } from '@/context/AuthContext'
import Login from '@/features/forms/Login'
import Registration from '@/features/forms/Registration'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
    const { isAuthenticated } = useAuth()

    const [isLoginForm, setIsLoginForm] = useState<boolean>(true)

    if (isAuthenticated) {
        return <Navigate to={'/projects'} />
    }

    return (
        <div className="flex flex-col justify-center items-center h-full">
            {isLoginForm ? (
                <Login setIsLoginForm={setIsLoginForm} />
            ) : (
                <Registration setIsLoginForm={setIsLoginForm} />
            )}
        </div>
    )
}

export default HomePage
