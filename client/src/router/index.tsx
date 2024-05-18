import App from '@/App'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
    },
]

export const router = createBrowserRouter(routes)
