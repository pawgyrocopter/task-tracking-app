import AddButton from '@/components/ui/AddButton'

const BoardAddTaskButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center justify-center rounded-lg border p-4"
        >
            <AddButton />
        </button>
    )
}

export default BoardAddTaskButton
