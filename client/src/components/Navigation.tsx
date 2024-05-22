import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import useIsMobile from '@/hooks/useIsMobile'
import { useParams } from 'react-router-dom'

const Navigation = ({ title }: { title: string }) => {
    const { logout } = useAuth()
    const isMobile = useIsMobile()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

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

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? 'underline text-black text-[1.35rem] font-bold'
            : 'text-black text-[1.35rem]'
    }

    return (
        <>
            {isMobile && (
                <header className="w-full flex items-center px-2 pt-2">
                    <button
                        className="focus:outline-none flex-1"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="h-8 w-8 text-black" />
                        ) : (
                            <Bars3Icon className="h-8 w-8 text-black" />
                        )}
                    </button>
                    <h1 className="text-2xl text-center">{title}</h1>
                    <div className="flex-1"></div>
                </header>
            )}

            <aside
                className={`md:static fixed top-0 left-0 z-[50] w-full md:w-[15rem] h-full bg-gray-500 text-white p-4 transform ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <nav className="h-full flex flex-col justify-between">
                    <ul className="flex flex-col items-center">
                        <li className="mb-4">
                            <Link
                                to="/projects"
                                onClick={toggleMenu}
                                className={getLinkClass('/projects')}
                            >
                                Projects
                            </Link>
                        </li>
                        {hasProjectSelected && (
                            <>
                                <li className="mb-4">
                                    <Link
                                        to={`/projects/${projectId}`}
                                        onClick={toggleMenu}
                                        className={getLinkClass(
                                            `/projects/${projectId}`
                                        )}
                                    >
                                        Overview
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        to={`/projects/${projectId}/board`}
                                        onClick={toggleMenu}
                                        className={getLinkClass(
                                            `/projects/${projectId}/board`
                                        )}
                                    >
                                        Board
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                to="/profile"
                                onClick={toggleMenu}
                                className={getLinkClass('/profile')}
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="p-2 bg-white text-[1.35rem] text-black shadow-lg rounded-full"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </nav>
            </aside>
        </>
    )
}

export default Navigation
