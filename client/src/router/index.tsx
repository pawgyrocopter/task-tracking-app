import HomePage from '@/pages'
import BoardPage from '@/pages/board'
import ErrorPage from '@/pages/error'
import ProfilePage from '@/pages/profile'
import ProjectOverview from '@/pages/project-overview'
import ProjectsPage from '@/pages/projects'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import CreateProjectPage from '@/pages/create-project'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <ProtectedLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: 'profile', element: <ProfilePage /> },
            { path: 'projects', element: <ProjectsPage /> },
            { path: 'create-project', element: <CreateProjectPage /> },
            { path: 'projects/:projectId', element: <ProjectOverview /> },
            { path: 'projects/:projectId/board', element: <BoardPage /> },
        ],
    },
]

export const router = createBrowserRouter(routes)
