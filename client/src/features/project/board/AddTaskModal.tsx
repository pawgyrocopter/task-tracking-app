import Modal from '@/components/ui/Modal'
import CreateTaskForm from '@/features/forms/CreateTask'

interface AddTaskModalProps {
    show: boolean
    onClose: () => void
    columnName: string
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
    show,
    onClose,
    columnName,
}) => {
    return (
        <Modal
            className="mt-[2rem] h-[calc(100%-0.5rem)] w-full md:ml-[190px] md:mt-[3.5rem] md:h-[calc(100%-3.5rem)] md:w-[50rem]"
            show={show}
            onClose={onClose}
        >
            <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="my-4 flex flex-col items-center justify-center">
                    <h1 className="text-lg">Create task</h1>
                    <h1 className="text-md text-gray-500">{columnName}</h1>
                </div>
                <CreateTaskForm onFormSubmit={onClose} />
            </div>
        </Modal>
    )
}

export default AddTaskModal
