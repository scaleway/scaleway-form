import { AnyObject } from 'final-form'
import { UseFieldConfig } from 'react-final-form'
import { BaseFieldProps } from '../types'

const pickUseFieldProps = <T = AnyObject, K = AnyObject>({
  afterSubmit,
  allowNull,
  beforeSubmit,
  data,
  defaultValue,
  format,
  formatOnBlur,
  initialValue,
  isEqual,
  multiple,
  parse,
  subscription,
  validate,
  validateFields,
  value,
}: BaseFieldProps<T, K>): UseFieldConfig<T, K> => ({
  afterSubmit,
  allowNull,
  beforeSubmit,
  data,
  defaultValue,
  format,
  formatOnBlur,
  initialValue,
  isEqual,
  multiple,
  parse,
  subscription,
  validate,
  validateFields,
  value,
})

export default pickUseFieldProps
