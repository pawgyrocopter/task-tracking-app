import HomePage from '@/pages'
import BoardPage from '@/pages/board'
import ErrorPage from '@/pages/error'
import ProfilePage from '@/pages/profile'
import ProjectOverview from '@/pages/project-overview'
import ProjectsPage from '@/pages/projects'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/profile',
        element: (
            <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/projects',
        element: (
            <ProtectedRoute>
                <ProjectsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/projects/:projectId',
        element: (
            <ProtectedRoute>
                <ProjectOverview />
            </ProtectedRoute>
        ),
    },
    {
        path: '/projects/:projectId/board',
        element: (
            <ProtectedRoute>
                <BoardPage />
            </ProtectedRoute>
        ),
    },
]

export const router = createBrowserRouter(routes)
