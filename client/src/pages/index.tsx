import { useAuth } from '@/context/AuthContext'
import Login from '@/features/login'

const HomePage = () => {
    const { isAuthenticated } = useAuth()
    console.log('isAuthenticated', isAuthenticated)
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Login />
        </div>
    )
}

export default HomePage
