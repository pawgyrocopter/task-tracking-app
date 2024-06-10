import AddButton from '@/components/ui/AddButton'
import { motion } from 'framer-motion'

const BoardAddTaskButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <motion.button
            layout
            onClick={onClick}
            className="flex w-full items-center justify-center rounded-lg border p-4"
        >
            <AddButton />
        </motion.button>
    )
}

export default BoardAddTaskButton
