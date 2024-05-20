export function formatDate(date: Date): string {
    if (!isNaN(date.getTime())) {
        const day = ('0' + date.getDate()).slice(-2)
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }
    return ''
}
