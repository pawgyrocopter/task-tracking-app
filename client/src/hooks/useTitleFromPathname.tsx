import { useLocation } from 'react-router-dom'

const useTitleFromPathname = () => {
    const location = useLocation()

    const getTitleFromPathname = (pathname: string) => {
        switch (pathname) {
            case '/profile':
                return 'Profile'
            case '/projects':
                return 'Projects'
            case '/create-project':
                return 'Create Project'
            case pathname.match(/^\/projects\/[^/]+$/)?.input:
                return 'Project Overview'
            case pathname.match(/^\/projects\/[^/]+\/board$/)?.input:
                return 'Board'
            default:
                return 'Page'
        }
    }

    return getTitleFromPathname(location.pathname)
}

export default useTitleFromPathname
