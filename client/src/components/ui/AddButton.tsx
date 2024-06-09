const AddButton = ({
    className,
}: {
    className?: string
}) => {
    return (
        <div className={className}>
            <img className="w-9" src="/add-circle.svg" alt="Add circle icon" />
        </div>
    )
}

export default AddButton
