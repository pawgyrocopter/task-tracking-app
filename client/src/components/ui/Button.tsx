import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
    const mergedClassname = twMerge(
        'p-2 bg-white text-[1.35rem] text-black shadow-lg rounded-full w-full',
        className
    )
    return (
        <button onClick={onClick} className={mergedClassname}>
            {children}
        </button>
    )
}

export default Button
