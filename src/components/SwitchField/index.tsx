import styled from '@emotion/styled'
import { Switch, Typography } from '@scaleway/ui'
import React, { ReactNode } from 'react'
import { useField } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { BaseFieldProps } from '../../types'

const StyledSwitchFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
`

type SwitchFieldProps<T = unknown, K = unknown> = BaseFieldProps<
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
  className?: string
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
  className,
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
    <StyledSwitchFieldContainer className={className}>
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
        <Typography color={input.checked ? 'primary' : 'neutral'}>
          {label}
        </Typography>
      )}
    </StyledSwitchFieldContainer>
  )
}

export default SwitchField
