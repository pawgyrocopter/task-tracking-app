import { customFetchWithCredentials } from '@/utils/fetch'
import { UserDTO } from './types'

const USERS_ENDPOINT = '/users'

export async function getAllUsers(): Promise<UserDTO[]> {
    const users = await customFetchWithCredentials<UserDTO[]>(USERS_ENDPOINT)

    return users
}

export async function getUsersInProject(projectId: string): Promise<UserDTO[]> {
    const users = await customFetchWithCredentials<UserDTO[]>(
        `${USERS_ENDPOINT}?projectId=${projectId}`
    )

    return users
}
