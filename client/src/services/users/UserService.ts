import { customFetchWithCredentials } from '@/utils/fetch'

const USERS_ENDPOINT = '/users'

export async function getAllUsers(): Promise<string[]> {
    const users = await customFetchWithCredentials<string[]>(USERS_ENDPOINT)

    return users
}

export async function getUsersInProject(projectId: string): Promise<string[]> {
    const users = await customFetchWithCredentials<string[]>(
        `${USERS_ENDPOINT}?projectId=${projectId}`
    )

    return users
}
