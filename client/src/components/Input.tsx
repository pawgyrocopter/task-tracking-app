interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({
    value,
    placeholder,
    name,
    className,
    type,
    onChange,
}: InputProps) => {
    const mergedClassName =
        'border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm'
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
