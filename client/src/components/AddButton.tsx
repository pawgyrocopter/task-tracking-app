const AddButton = ({
    onClick,
    className,
}: {
    onClick?: () => void
    className?: string
}) => {
    return (
        <div className={className} onClick={onClick}>
            <img className="w-9" src="/add-circle.svg" alt="Add circle icon" />
        </div>
    )
}

export default AddButton
