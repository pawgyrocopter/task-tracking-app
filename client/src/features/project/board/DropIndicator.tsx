const DropIndicator = ({
    beforeId,
    columnId,
}: {
    beforeId: string
    columnId: number
}) => {
    return (
        <div
            data-before={beforeId || '-1'}
            data-column={columnId}
            className="my-0.5 h-[0.15rem] w-full bg-violet-500 opacity-0"
        ></div>
    )
}

export default DropIndicator
