import { ValidatorFn } from './types'

const minDateValidator: ValidatorFn<Date, Date> = minDate => ({
  error: 'MIN_DATE',
  validate: value => value >= minDate,
})

export default minDateValidator
