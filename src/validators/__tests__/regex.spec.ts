import regex from '../regex'

const alpha = /^[a-zA-Z]*$/
const digits = /^[0-9]*$/

describe('regex validator', () => {
  test('should not throw error', () => {
    const validator = regex([alpha])
    expect(validator).toBeDefined()
    expect(validator.error).toBe('REGEX')
  })

  test('should success', () => {
    const validator = regex([alpha])
    expect(validator.validate('test', {})).toBe(true)
  })

  test('should failed', () => {
    const validator = regex([alpha])
    expect(validator.validate('a1', {})).toBe(false)
    expect(validator.validate('a+', {})).toBe(false)
  })

  test('should support or value', () => {
    const validator = regex([[alpha, digits]])
    expect(validator.validate('test', {})).toBe(true)
    expect(validator.validate('1234', {})).toBe(true)
  })
})
