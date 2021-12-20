import { ValidatorFn } from './types'

const requiredValidator: ValidatorFn = () => ({
  error: 'REQUIRED',
  validate: (value: unknown) => !!value,
})

export default requiredValidator
