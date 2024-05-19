import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({
    value,
    placeholder,
    name,
    className,
    type,
    onChange,
}: InputProps) => {
    const mergedClassName = twMerge(
        'border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm',
        className
    )
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            className={mergedClassName}
            type={type}
        />
    )
}

export default Input
