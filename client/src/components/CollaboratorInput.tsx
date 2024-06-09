import React, { useState } from 'react'
import AddButton from '@/components/AddButton'
import { validateEmail } from '@/utils/validation'

interface CollaboratorInputProps {
    collaborators: string[]
    setCollaborators: React.Dispatch<React.SetStateAction<string[]>>
    placeholder?: string
    singleCollaborator?: boolean
}

const CollaboratorInput: React.FC<CollaboratorInputProps> = ({
    collaborators,
    setCollaborators,
    placeholder = 'Collaborators',
    singleCollaborator = false,
}) => {
    const [showInput, setShowInput] = useState<boolean>(false)
    const [newCollaborator, setNewCollaborator] = useState<string>('')
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editingValue, setEditingValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleAddCollaborator = () => {
        const collaborator = newCollaborator.trim()
        if (collaborator && collaborator.length > 0) {
            const validation = validateEmail(collaborator)

            if (validation === true) {
                if (singleCollaborator) {
                    setCollaborators([collaborator])
                } else {
                    setCollaborators([...collaborators, collaborator])
                }
                setNewCollaborator('')
                setShowInput(false)
                setError('')
            } else {
                setError(validation as string)
            }
        } else {
            setNewCollaborator('')
            setShowInput(false)
            setError('')
        }
    }

    const handleEditCollaborator = (index: number) => {
        setEditingIndex(index)
        setEditingValue(collaborators[index])
        setError('')
    }

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const collaborator = editingValue.trim()

            if (collaborator === '') {
                // Remove collaborator if the input is empty
                const updatedCollaborators = [...collaborators]
                updatedCollaborators.splice(editingIndex, 1)
                setCollaborators(updatedCollaborators)
                setEditingIndex(null)
                setEditingValue('')
                setError('')
            } else {
                const validation = validateEmail(collaborator)
                if (validation === true) {
                    const updatedCollaborators = [...collaborators]
                    updatedCollaborators[editingIndex] = collaborator
                    setCollaborators(updatedCollaborators)
                    setEditingIndex(null)
                    setEditingValue('')
                    setError('')
                } else {
                    setError(validation as string)
                }
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault() // Prevent form submission
            handleSaveEdit()
        }
    }

    const handleBlur = () => {
        handleSaveEdit()
    }

    return (
        <div className=" flex flex-col  w-full">
            <div className="border shadow-lg flex flex-wrap rounded-lg  h-[2.25rem] items-center gap-2 px-2 w-full">
                {collaborators.length === 0 && (
                    <p className="text-gray-700 text-lg">{placeholder}</p>
                )}
                {collaborators.map((email, index) => (
                    <div key={index} className="flex items-center">
                        {editingIndex === index ? (
                            <input
                                type="email"
                                value={editingValue}
                                onChange={(e) =>
                                    setEditingValue(e.target.value)
                                }
                                onBlur={handleBlur}
                                onKeyDown={handleKeyPress}
                                className="border px-2 placeholder:text-gray-700 text-lg rounded-lg shadow-lg"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="text-gray-700 text-lg cursor-pointer"
                                onClick={() => handleEditCollaborator(index)}
                            >
                                {email}
                            </span>
                        )}
                    </div>
                ))}
                {showInput ? (
                    <input
                        type="email"
                        value={newCollaborator}
                        onChange={(e) => setNewCollaborator(e.target.value)}
                        onBlur={handleAddCollaborator}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddCollaborator()
                            }
                        }}
                        className="border w-[10rem] px-2 placeholder:text-gray-700 text-lg rounded-lg shadow-lg"
                        autoFocus
                    />
                ) : !singleCollaborator || collaborators.length === 0 ? (
                    <AddButton
                        onClick={() => setShowInput(true)}
                        className="w-5 h-5 cursor-pointer"
                    />
                ) : null}
            </div>
            <span className="h-5">
                {error && (
                    <p className="text-red-500 text-xs w-full">{error}</p>
                )}
            </span>
        </div>
    )
}

export default CollaboratorInput
