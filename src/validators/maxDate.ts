import { ValidatorFn } from './types'

const maxDateValidator: ValidatorFn<Date, Date> = maxDate => ({
  error: 'MAX_DATE',
  validate: value => value <= maxDate,
})

export default maxDateValidator
