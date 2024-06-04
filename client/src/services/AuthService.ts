import { LoginFormFields, RegistrationFormFields } from '@/features/forms/types'
import { customFetch } from '@/utils/fetch'

const AUTH_ENDPOINT = '/auth'

export async function loginUser(credentials: LoginFormFields) {
    return customFetch(AUTH_ENDPOINT + '/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}

export async function registerUser(credentials: RegistrationFormFields) {
    return customFetch(AUTH_ENDPOINT + '/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}

export async function refreshToken(token: string, refreshToken: string) {
    return customFetch(AUTH_ENDPOINT + '/refresh', {
        method: 'POST',
        body: JSON.stringify({ token, refreshToken }),
    })
}
