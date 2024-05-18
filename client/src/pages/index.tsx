import { useAuth } from '@/context/AuthContext'

const HomePage = () => {
    const { isAuthenticated, login, logout } = useAuth()
    console.log('isAuthenticated', isAuthenticated)
    return (
        <div className="flex flex-col items-center">
            <p>home page</p>
            <button onClick={login}>login</button>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default HomePage
