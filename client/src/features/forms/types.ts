export type LoginFormFields = {
    email: string
    password: string
}

export type RegistrationFormFields = {
    name: string
    email: string
    phoneNumber: string
    password: string
    repeatPassword: string
}

export type CreateProjectFormFields = {
    name: string
    description: string
    startDate: Date
    endDate: Date
    colaborators: string[]
}
