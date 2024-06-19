import React, { useState } from 'react'
import AddButton from '@/components/ui/AddButton'
import { validateEmail } from '@/utils/validation'

interface CollaboratorInputProps {
    collaborators: string[]
    setCollaborators: React.Dispatch<React.SetStateAction<string[]>>
    placeholder?: string
    singleCollaborator?: boolean
    availableCollaborators: string[]
}

const CollaboratorInput: React.FC<CollaboratorInputProps> = ({
    collaborators,
    setCollaborators,
    placeholder = 'Collaborators',
    singleCollaborator = false,
    availableCollaborators,
}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
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
                setShowDropdown(false)
                setError('')
            } else {
                setError(validation as string)
            }
        } else {
            setNewCollaborator('')
            setShowDropdown(false)
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
        <div className="flex w-full flex-col">
            <div className="flex w-full flex-wrap items-center gap-2 rounded-lg border px-2 shadow-lg">
                {collaborators.length === 0 && (
                    <p className="text-lg text-gray-700">{placeholder}</p>
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
                                className="rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="cursor-pointer text-lg text-gray-700"
                                onClick={() => handleEditCollaborator(index)}
                            >
                                {email}
                            </span>
                        )}
                    </div>
                ))}
                {showDropdown ? (
                    <select
                        value={newCollaborator}
                        onChange={(e) => setNewCollaborator(e.target.value)}
                        onBlur={handleAddCollaborator}
                        className="w-[12rem] rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700"
                        autoFocus
                    >
                        <option value="">Select collaborator</option>
                        {availableCollaborators.map((collaborator, index) => (
                            <option key={index} value={collaborator}>
                                {collaborator}
                            </option>
                        ))}
                    </select>
                ) : !singleCollaborator || collaborators.length === 0 ? (
                    <button onClick={() => setShowDropdown(true)}>
                        <AddButton className="h-5 w-5 cursor-pointer" />
                    </button>
                ) : null}
            </div>
            <span className="h-5">
                {error && (
                    <p className="w-full text-xs text-red-500">{error}</p>
                )}
            </span>
        </div>
    )
}

export default CollaboratorInput
