export interface LoginForm {
    name: string
    password: string
    isValid: boolean
}

export interface RegistrationForm extends LoginForm {
    email: string
    repeatPassword: string
}
