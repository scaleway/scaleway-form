import required from '../required'

describe('required validator', () => {
  test('should not throw error', () => {
    expect(required(undefined)).toBeDefined()
    expect(required(undefined).error).toBe('REQUIRED')
  })

  test('should success', () => {
    expect(required(undefined).validate('test', {})).toBe(true)
    expect(required(undefined).validate(true, {})).toBe(true)
    expect(required(undefined).validate({}, {})).toBe(true)
  })

  test('should failed', () => {
    expect(required(undefined).validate('', {})).toBe(false)
    expect(required(undefined).validate(undefined, {})).toBe(false)
    expect(required(undefined).validate(false, {})).toBe(false)
  })
})
