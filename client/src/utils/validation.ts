const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_REGEX = /^[a-zA-Z\s'-]+$/
const PHONE_NUMBER_REGEX = /^\+?[1-9]\d{1,14}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

export function validateEmail(value: string): string | boolean {
    return EMAIL_REGEX.test(value) ? true : 'Invalid email format.'
}

export function validateName(value: string): string | boolean {
    return NAME_REGEX.test(value)
        ? true
        : 'Name can only contain letters, spaces, hyphens, and apostrophes.'
}

export function validatePhoneNumber(value: string): string | boolean {
    return PHONE_NUMBER_REGEX.test(value)
        ? true
        : 'Invalid phone number format.'
}

export function validatePassword(value: string): string | boolean {
    return PASSWORD_REGEX.test(value)
        ? true
        : 'Password must be at least 8 characters long and contain at least one letter and one number.'
}
