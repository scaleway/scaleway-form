import { Toggle } from '@scaleway/ui'
import React, { ComponentProps } from 'react'
import { useField } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { BaseFieldProps } from '../../types'

type ToggleFieldProps<T = unknown, K = unknown> = BaseFieldProps<T, K> &
  Pick<
    ComponentProps<typeof Toggle>,
    | 'disabled'
    | 'label'
    | 'onChange'
    | 'size'
    | 'tooltip'
    | 'labelPosition'
    | 'className'
  > & {
    name: string
    required?: boolean
  }

const ToggleField = ({
  afterSubmit,
  allowNull,
  beforeSubmit,
  className,
  data,
  defaultValue,
  disabled,
  format,
  formatOnBlur,
  initialValue,
  isEqual,
  label,
  multiple,
  name,
  onChange,
  parse,
  required,
  size,
  subscription,
  tooltip,
  validate,
  validateFields,
  value,
  labelPosition,
}: ToggleFieldProps) => {
  const validateFn = useValidation({
    validate,
    validators: pickValidators({ required }),
  })

  const { input } = useField(name, {
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
    type: 'checkbox',
    validate: validateFn,
    validateFields,
    value,
  })

  return (
    <Toggle
      checked={input.checked}
      tooltip={tooltip}
      onChange={event => {
        input.onChange(event)
        onChange?.(event)
      }}
      label={label}
      size={size}
      name={name}
      disabled={disabled}
      labelPosition={labelPosition}
      className={className}
    />
  )
}

export default ToggleField
