import { AnyValue } from '../types'
import { ValidatorFn } from './types'

const requiredValidator: ValidatorFn = () => ({
  error: 'REQUIRED',
  validate: (value: AnyValue) => !!value,
})

export default requiredValidator
