import Modal from '@/components/ui/Modal'

interface AddTaskModalProps {
    show: boolean
    onClose: () => void
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ show, onClose }) => {
    return (
        <Modal
            className="h-[calc(100%-0.5rem)] mt-[2rem] md:h-[calc(100%-3.5rem)] md:mt-[3.5rem] md:ml-[190px] w-full md:w-[50rem]"
            show={show}
            onClose={onClose}
        >
            <div className="">form</div>
        </Modal>
    )
}

export default AddTaskModal
