interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ id, placeholder, className, type, onChange }: InputProps) => {
    const mergedClassName =
        'border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm'
    return (
        <input
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            className={mergedClassName}
            type={type}
        />
    )
}

export default Input
