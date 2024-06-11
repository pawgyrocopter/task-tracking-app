import Modal from '@/components/ui/Modal'
import { BoardTask } from './types'
import { getPriorityColor } from './shared'
import { capitalizeString } from '@/utils/strings'

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
            <div className="flex h-full w-full flex-col items-center justify-between p-4">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-xl font-semibold">{task.name}</h1>
                    <p>{task.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Priority:</p>
                        <div className="flex items-center gap-2">
                            <p>{capitalizeString(task.priority)}</p>
                            <div
                                className={`h-3 w-3 rounded-full ${getPriorityColor(task.priority)}`}
                            ></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Assignee:</p>
                        <div className="flex items-center gap-2">
                            <p>{task.assignee}</p>
                            <img
                                src={task.avatar}
                                className="flex h-6 w-6 items-center justify-center rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default TaskModal
