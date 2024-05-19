import Navigation from '@/components/Navigation'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
    return (
        <div className="flex h-screen">
            {<Navigation />}
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default ProtectedLayout
