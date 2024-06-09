import React, { useEffect, useState } from 'react'
import '@/assets/css/modal.css'
import { twMerge } from 'tailwind-merge'

interface ModalProps {
    show: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1.5rem"
            width="1.5rem"
            {...props}
        >
            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
        </svg>
    )
}

const Modal: React.FC<ModalProps> = ({
    show,
    onClose,
    children,
    className,
}) => {
    const [visible, setVisible] = useState(show)
    const [animationClass, setAnimationClass] = useState('')

    useEffect(() => {
        if (show) {
            setVisible(true)
            setAnimationClass('modal-enter')
        } else {
            setAnimationClass('modal-leave')
            const timer = setTimeout(() => setVisible(false), 300)
            return () => clearTimeout(timer)
        }
    }, [show])

    if (!visible) return null

    const mergedInnerClassName = twMerge(
        `bg-white w-full h-full relative rounded-lg shadow-lg transition-opacity transform ${animationClass}`,
        className
    )

    return (
        <div
            className={`fixed inset-0 z-50 p-8 flex items-center justify-center ${
                visible ? 'visible' : 'invisible'
            }`}
        >
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${animationClass}`}
                onClick={onClose}
            ></div>

            <div className={mergedInnerClassName}>
                <button
                    className="m-4 absolute right-0 top-0"
                    onClick={onClose}
                >
                    <CloseIcon className='w-3.5 h-3.5 md:w-5 md:h-5' />
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
