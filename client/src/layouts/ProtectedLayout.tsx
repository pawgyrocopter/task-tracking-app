import Navigation from '@/components/Navigation'
import useTitleFromPathname from '@/hooks/useTitleFromPathname'
import { Outlet } from 'react-router-dom'
import Page from './Page'

const ProtectedLayout = () => {
    const title = useTitleFromPathname()

    return (
        <div className="flex md:flex-row flex-col h-screen">
            <Navigation title={title} />
            <main className="container">
                <Page title={title}>
                    <Outlet />
                </Page>
            </main>
        </div>
    )
}

export default ProtectedLayout
