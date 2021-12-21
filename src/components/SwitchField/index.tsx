import { FlexBox, Switch, Typography } from '@scaleway/ui'
import React, { ReactNode } from 'react'
import { useField } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { BaseFieldProps } from '../../types'

export type SwitchFieldProps<T = unknown, K = unknown> = BaseFieldProps<
  T,
  K
> & {
  required?: boolean
  label?: string
  variant?: 'primary' | 'success'
  size?: 'small' | 'medium'
  tooltip?: string
  width?: number
  labeled?: 'inside' | 'left' | 'right' | boolean
  offLabel?: ReactNode
  onLabel?: ReactNode
  name: string
  disabled?: boolean
}

const SwitchField = ({
  label,
  variant,
  size = 'small',
  tooltip,
  width,
  onLabel = 'ON',
  offLabel = 'OFF',
  labeled,
  name,
  defaultValue,
  disabled,
  validate,
  required,
  afterSubmit,
  allowNull,
  beforeSubmit,
  data,
  format,
  formatOnBlur,
  initialValue,
  isEqual,
  multiple,
  parse,
  subscription,
  validateFields,
  value,
}: SwitchFieldProps) => {
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
    <FlexBox alignItems="center">
      <Switch
        checked={input.checked}
        variant={variant}
        width={width}
        tooltip={tooltip}
        onChange={input.onChange}
        onLabel={onLabel}
        offLabel={offLabel}
        labeled={labeled}
        size={size}
        name={name}
        disabled={disabled}
      />
      {label && (
        <Typography ml={1} color={input.checked ? 'primary' : 'gray950'}>
          {label}
        </Typography>
      )}
    </FlexBox>
  )
}

export default SwitchField
