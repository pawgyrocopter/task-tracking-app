export function formatDate(date: Date): string {
    if (!isNaN(date.getTime())) {
        const day = ('0' + date.getDate()).slice(-2)
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }
    return ''
}

// make first letter uppercased and others lowercased
export function capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
}
