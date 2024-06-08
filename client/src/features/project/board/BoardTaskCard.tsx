import { BoardTask, TaskPriority } from './types'

const BoardTaskCard = ({ task }: { task: BoardTask }) => {
    return (
        <div key={task.id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <div className="flex gap-3 items-center">
                <h3 className="font-semibold mb-2">{task.name}</h3>
                <div
                    className={`h-3 w-3 rounded-full ${getPriorityColor(
                        task.priority
                    )} mb-2`}
                ></div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{task.description}</p>
            <div className="flex space-x-2">
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                    {task.avatar}
                </div>
            </div>
        </div>
    )
}

function getPriorityColor(priority: TaskPriority): string {
    switch (priority) {
        case 'HIGHEST':
            return 'bg-red-500'
        case 'HIGH':
            return 'bg-orange-500'
        case 'MEDIUM':
            return 'bg-yellow-400'
        case 'LOW':
            return 'bg-green-400'
        case 'LOWEST':
            return 'bg-gray-400'
    }
}

export default BoardTaskCard
