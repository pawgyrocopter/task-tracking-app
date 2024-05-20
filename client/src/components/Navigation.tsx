import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import useIsMobile from '@/hooks/useIsMobile'
import { useParams } from 'react-router-dom'

const Navigation = () => {
    const { logout } = useAuth()
    const isMobile = useIsMobile()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { projectId } = useParams()

    const hasProjectSelected: boolean = !!projectId

    const toggleMenu = () => {
        if (isMobile) {
            setIsMenuOpen(!isMenuOpen)
        }
    }

    useEffect(() => {
        if (isMobile) {
            setIsMenuOpen(false)
        } else {
            setIsMenuOpen(true)
        }
    }, [isMobile])

    return (
        <>
            {isMobile && (
                <div className="w-[4rem]">
                    <button
                        className="absolute top-0 left-0 z-[100] p-2 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="h-8 w-8 text-white" />
                        ) : (
                            <Bars3Icon className="h-8 w-8 text-white" />
                        )}
                    </button>
                </div>
            )}

            <aside
                className={`md:static fixed top-0 left-0 z-[50] w-full md:w-[15rem] h-full bg-gray-800 text-white p-4 transform ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <nav className="h-full flex flex-col justify-between">
                    <ul className="flex flex-col items-center">
                        <li className="mb-4">
                            <Link to="/projects" onClick={toggleMenu}>
                                Projects
                            </Link>
                        </li>
                        {hasProjectSelected && (
                            <>
                                <li className="mb-4">
                                    <Link
                                        to={`/projects/${projectId}`}
                                        onClick={toggleMenu}
                                    >
                                        Overview
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        to={`/projects/${projectId}/board`}
                                        onClick={toggleMenu}
                                    >
                                        Board
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/profile" onClick={toggleMenu}>
                                Profile
                            </Link>
                        </li>
                    </ul>
                    <button onClick={logout}>Logout</button>
                </nav>
            </aside>
        </>
    )
}

export default Navigation
