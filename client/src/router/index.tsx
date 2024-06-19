import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import CreateProjectPage from '@/pages/CreateProject'
import HomePage from '@/pages'
import ErrorPage from '@/pages/ErrorPage'
import ProfilePage from '@/pages/Profile'
import ProjectsPage from '@/pages/Projects'
import ProjectOverview from '@/pages/ProjectOverview'
import BoardPage from '@/pages/Board'
import EditProjectPage from '@/pages/EditProject'

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
            { path: 'edit-project', element: <EditProjectPage /> },
            { path: 'projects/:projectId', element: <ProjectOverview /> },
            { path: 'projects/:projectId/board', element: <BoardPage /> },
        ],
    },
]

export const router = createBrowserRouter(routes)
