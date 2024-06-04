import { LoginFormFields, RegistrationFormFields } from '@/features/forms/types'
import { customFetch } from '@/utils/fetch'

const AUTH_ENDPOINT = '/auth'

export interface AuthTokens {
    token: string
    refreshToken: string
}

export async function registerUser(credentials: RegistrationFormFields) {
    return customFetch(AUTH_ENDPOINT + '/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}

export async function loginUser(
    credentials: LoginFormFields
): Promise<AuthTokens> {
    return customFetch<AuthTokens>(AUTH_ENDPOINT + '/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}

export async function refresh(refreshToken: string): Promise<AuthTokens> {
    return customFetch(AUTH_ENDPOINT + '/refresh', {
        method: 'POST',
        body: JSON.stringify({
            refreshToken: refreshToken,
        }),
    })
}
