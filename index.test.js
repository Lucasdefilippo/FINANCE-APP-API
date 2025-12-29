const sum = (a, b) => {
    return a + b
}

describe('sum function', () => {
    it('should sum two number correctly', () => {
        const a = 5
        const b = 3

        const result = sum(a, b)

        expect(result).toBe(8)
    })
})
