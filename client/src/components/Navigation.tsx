import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import useIsMobile from '@/hooks/useIsMobile'
import { useParams } from 'react-router-dom'
import Button from './ui/Button'

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
                <header className="flex w-full items-center px-2 pt-2">
                    <button
                        className="flex-1 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="h-8 w-8 text-black" />
                        ) : (
                            <Bars3Icon className="h-8 w-8 text-black" />
                        )}
                    </button>
                    <h1 className="text-center text-2xl">{title}</h1>
                    <div className="flex-1"></div>
                </header>
            )}

            <aside
                className={`fixed left-0 top-0 z-[50] h-full w-full transform bg-gray-500 p-4 text-white md:static md:w-[15rem] ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <nav className="flex h-full flex-col justify-between">
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
                                {/* <li className="mb-4">
                                    <Link
                                        to={`/projects/${projectId}`}
                                        onClick={toggleMenu}
                                        className={getLinkClass(
                                            `/projects/${projectId}`
                                        )}
                                    >
                                        Overview
                                    </Link>
                                </li> */}
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
                    <Button onClick={logout}>Logout</Button>
                </nav>
            </aside>
        </>
    )
}

export default Navigation
