export interface LoginForm {
    email: string
    password: string
}

export interface RegistrationForm extends LoginForm {
    name: string
    email: string
    repeatPassword: string
}
