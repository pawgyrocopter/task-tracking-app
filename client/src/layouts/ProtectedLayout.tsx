import Navigation from '@/components/Navigation'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
    return (
        <div className="flex md:flex-row flex-col h-screen">
            {<Navigation />}
            <main className="container">
                <Outlet />
            </main>
        </div>
    )
}

export default ProtectedLayout
