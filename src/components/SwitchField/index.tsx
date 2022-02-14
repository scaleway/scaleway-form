import styled from '@emotion/styled'
import { Switch, Typography } from '@scaleway/ui'
import React, { ComponentProps } from 'react'
import { useField } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { BaseFieldProps } from '../../types'

const StyledSwitchFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
`

type SwitchFieldProps<T = unknown, K = unknown> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof Switch>,
      | 'disabled'
      | 'labeled'
      | 'offLabel'
      | 'onChange'
      | 'onLabel'
      | 'size'
      | 'tooltip'
      | 'variant'
      | 'width'
    >
  > & {
    className?: string
    label?: string
    name: string
    required?: boolean
  }

const SwitchField = ({
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
  labeled,
  multiple,
  name,
  offLabel = 'OFF',
  onChange,
  onLabel = 'ON',
  parse,
  required,
  size = 'small',
  subscription,
  tooltip,
  validate,
  validateFields,
  value,
  variant,
  width,
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
        onChange={event => {
          input.onChange(event)
          onChange?.(event)
        }}
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
