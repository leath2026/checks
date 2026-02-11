function formatMoney (number: string) {
    const trimmed = number?.trim()
    if (!trimmed) {
        return ''
    }
    const numberFloat = Number.parseFloat(trimmed)
    if (Number.isNaN(numberFloat)) {
        return ''
    }
    return numberFloat.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export { formatMoney }

