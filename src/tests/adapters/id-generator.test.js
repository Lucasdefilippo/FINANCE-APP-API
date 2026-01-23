import { IdGeneratorAdapter } from '../../adapters'
import validator from 'validator'

describe('Id Generator', () => {
    it('should return a random id', () => {
        const sut = new IdGeneratorAdapter()

        const result = sut.execute()

        expect(result).toBeTruthy()
        expect(validator.isUUID(result)).toBe(true)
        expect(typeof result).toBe('string')
    })
})
