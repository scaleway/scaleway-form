import { SelectNumber } from '@scaleway/ui'
import React, { ComponentProps, FocusEvent, FocusEventHandler } from 'react'
import { useField } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { BaseFieldProps } from '../../types'

type SelectNumberValue = NonNullable<
  ComponentProps<typeof SelectNumber>['value']
>

type SelectNumberValueFieldProps<
  T = SelectNumberValue,
  K = string,
> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof SelectNumber>,
      | 'disabled'
      | 'maxValue'
      | 'minValue'
      | 'onMaxCrossed'
      | 'onMinCrossed'
      | 'size'
      | 'step'
      | 'text'
      | 'value'
      | 'onChange'
    >
  > & {
    name: string
    required?: boolean
    onBlur?: FocusEventHandler<HTMLInputElement>
    onFocus?: FocusEventHandler<HTMLInputElement>
  }

const SelectNumberField = ({
  disabled,
  maxValue,
  minValue,
  name,
  onChange,
  onBlur,
  onFocus,
  onMaxCrossed,
  onMinCrossed,
  required,
  size,
  step,
  text,
  validate,
  value,
}: SelectNumberValueFieldProps) => {
  const validateFn = useValidation<SelectNumberValue>({
    validate,
    validators: pickValidators({
      required,
    }),
  })

  const { input } = useField(name, {
    type: 'number',
    validate: validateFn,
    value,
  })

  return (
    <SelectNumber
      name={name}
      disabled={disabled}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onChange={event => {
        input.onChange(event)
        onChange?.(event as number)
      }}
      onFocus={(event: FocusEvent<HTMLInputElement>) => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      maxValue={maxValue}
      minValue={minValue}
      onMinCrossed={onMinCrossed}
      onMaxCrossed={onMaxCrossed}
      size={size}
      step={step}
      text={text}
      value={input.value}
    />
  )
}

export default SelectNumberField
