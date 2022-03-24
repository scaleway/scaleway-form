import { FormErrors } from '../types'

const mockErrors: FormErrors = {
  MAX_LENGTH: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength}`,
  MIN_LENGTH: ({ minLength }) =>
    `This field should have a length greater than ${minLength}`,
  REGEX: ({ regex }) =>
    `This field should match the regex ${regex
      .map(r =>
        Array.isArray(r)
          ? r.map(nestedRegex => nestedRegex.source).join(' or ')
          : r.source,
      )
      .join(' and ')}`,
  REQUIRED: 'This field is required',
  TOO_HIGH: ({ max }) => `This field is too high (maximum is : ${max})`,
  TOO_LOW: 'This field is too low',
}

export default mockErrors
