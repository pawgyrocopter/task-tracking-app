export interface LoginCredentials {
    name: string
    password: string
}

export interface RegistrationCredentials extends LoginCredentials {
    email: string
    repeatPassword: string
}
