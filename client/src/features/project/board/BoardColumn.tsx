import BoardTaskCard from './BoardTaskCard'

const BoardColumn = ({ column }: { column: any }) => {
    return (
        <div
            key={column.id}
            className="w-full md:w-1/3 bg-gray-100 rounded-lg p-4 flex flex-col md:h-full"
        >
            <h2 className="text-xl font-semibold mb-4">
                {column.title} {column.tasks.length} of 21
            </h2>
            <div className="md:flex-grow md:overflow-auto">
                {column.tasks.map((task: any) => (
                    <BoardTaskCard key={task.id} task={task} />
                ))}
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4">
                +
            </button>
        </div>
    )
}

export default BoardColumn
