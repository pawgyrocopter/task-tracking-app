import { LoginForm, RegistrationForm } from '@/features/login/types'

export function validateLogin(credentials: LoginForm): boolean {
    if (credentials.name.length > 0 && credentials.password.length > 0) {
        return true
    }

    return false
}

export function validateRegistration(credentials: RegistrationForm): boolean {
    if (
        credentials.email.length > 0 &&
        credentials.name.length > 0 &&
        credentials.password.length > 0 &&
        credentials.repeatPassword.length > 0
    ) {
        return true
    }

    return false
}
