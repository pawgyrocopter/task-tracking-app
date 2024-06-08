import BoardAddTaskButton from './BoardAddTaskButton'
import BoardTaskCard from './BoardTaskCard'
import { BoardColumn as BoardColumnType, BoardTask } from './types'

const BoardColumn = ({ column }: { column: BoardColumnType }) => {
    return (
        <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-4 flex flex-col md:h-full">
            <h2 className="text-xl font-semibold mb-4">
                {column.name} {column.tasks.length} of 21
            </h2>
            <div className="md:flex-grow md:overflow-auto">
                {column.tasks.map((task: BoardTask) => (
                    <BoardTaskCard key={task.id} task={task} />
                ))}
                <BoardAddTaskButton
                    onClick={() =>
                        console.log(`add task on column with id: ${column.id}`)
                    }
                />
            </div>
        </div>
    )
}

export default BoardColumn
