import AddButton from '@/components/AddButton'

const BoardAddTaskButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex justify-center items-center rounded-lg border p-4"
        >
            <AddButton />
        </button>
    )
}

export default BoardAddTaskButton
