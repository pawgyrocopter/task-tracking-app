import { TaskPriority } from '@/services/task/types'

export function getPriorityColor(priority: TaskPriority): string {
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
