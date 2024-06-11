import Modal from '@/components/ui/Modal'
import { BoardTask } from './types'

interface AddTaskModalProps {
    show: boolean
    onClose: () => void
    task: BoardTask
}

const TaskModal: React.FC<AddTaskModalProps> = ({ show, onClose, task }) => {
    return (
        <Modal
            className="mt-[2rem] h-[calc(100%-0.5rem)] w-full md:ml-[190px] md:mt-[3.5rem] md:h-[calc(100%-3.5rem)] md:w-[50rem]"
            show={show}
            onClose={onClose}
        >
            <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="my-4 flex flex-col items-center justify-center">
                    <h1 className="text-lg">{task.name}</h1>
                </div>
            </div>
        </Modal>
    )
}

export default TaskModal
