const AddButton = ({
    onClick,
    className,
}: {
    onClick?: () => void
    className?: string
}) => {
    return (
        <button className={className} onClick={onClick}>
            <img className="w-9" src="add-circle.svg" alt="Add circle icon" />
        </button>
    )
}

export default AddButton
