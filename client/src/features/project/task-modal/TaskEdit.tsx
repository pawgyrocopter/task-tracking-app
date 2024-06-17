import React from 'react'
import { BoardTask } from '../board/types'
import { capitalizeString, formatDate } from '@/utils/strings'
import { TaskPriorities } from '@/services/task/types'

interface TaskEditProps {
    task: BoardTask
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void
    onSave: () => void
    onCancel: () => void
}

const TaskEdit: React.FC<TaskEditProps> = ({
    task,
    onChange,
    onSave,
    onCancel,
}) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-between p-4">
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <input
                    type="text"
                    name="name"
                    onChange={onChange}
                    className="text-center text-xl font-semibold"
                    defaultValue={task.name}
                />
                <textarea
                    name="description"
                    onChange={onChange}
                    className="min-h-[22rem] w-[75%] resize-none text-center md:min-h-[25rem]"
                    defaultValue={task.description}
                />
            </div>
            <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Priority:</p>
                        <select
                            name="priority"
                            onChange={onChange}
                            className="w-[5rem] rounded-md border border-gray-300"
                            defaultValue={capitalizeString(task.priority)}
                        >
                            {TaskPriorities.map((priority) => (
                                <option>{capitalizeString(priority)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Due date:</p>
                        <input
                            name="dueDate"
                            onChange={onChange}
                            defaultValue={task.dueDate?.toLocaleDateString(
                                undefined,
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                            placeholder="Due date (optional)"
                            type="text"
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => {
                                e.target.type = 'text'
                                const formattedDate = formatDate(
                                    new Date(e.target.value)
                                )
                                e.target.value = formattedDate
                            }}
                            className="text-md h-[1.5rem] cursor-pointer rounded-lg border px-2 shadow-lg placeholder:text-gray-700 md:max-w-[15rem]"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Assignee:</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                name="assignee"
                                onChange={onChange}
                                className="md:max-w-[15rem]"
                                defaultValue={task.assignee}
                            />
                            <img
                                src={task.avatar}
                                className="flex h-6 w-6 items-center justify-center rounded-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex w-full justify-center gap-2">
                    <button
                        className="rounded-md bg-blue-500 px-4 py-1 text-white"
                        onClick={onSave}
                    >
                        Save
                    </button>
                    <button
                        className="rounded-md bg-gray-500 px-4 py-1 text-white"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskEdit
