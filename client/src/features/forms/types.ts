export type LoginFormFields = {
    email: string
    password: string
}

export type RegistrationFormFields = {
    name: string
    email: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

export type CreateProjectFormFields = {
    name: string
    description: string
    startDate: string
    endDate: string
    colaborators: string[]
}

export type CreateTaskFormFields = {
    name: string
    description: string
    priority: string
    assignee: string
    dueDate?: string
}
