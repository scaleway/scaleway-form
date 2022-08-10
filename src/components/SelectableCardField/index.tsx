import { SelectableCard } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, { ComponentProps, ReactNode, useMemo } from 'react'
import { useField, useFormState } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type SelectableCardValue = NonNullable<
  ComponentProps<typeof SelectableCard>['value']
>

type SelectableCardFieldProps<
  T = SelectableCardValue,
  K = string,
> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof SelectableCard>,
      | 'disabled'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'value'
      | 'showTick'
      | 'type'
      | 'id'
    >
  > & {
    children?: ReactNode
    name: string
    required?: boolean
    className?: string
  }

const SelectableCardField = ({
  name,
  value,
  onChange,
  showTick,
  type,
  disabled,
  children,
  className,
  onFocus,
  onBlur,
  required,
  validate,
  id,
}: SelectableCardFieldProps): JSX.Element => {
  const { values } = useFormState()
  const { getFirstError } = useErrors()

  const validateFn = useValidation<SelectableCardValue>({
    validate,
    validators: pickValidators({
      required,
    }),
  })

  const { input, meta } = useField(name, {
    type: type ?? 'radio',
    validate: validateFn,
    value,
  })

  const error = useMemo(
    () =>
      meta.error
        ? getFirstError({
            allValues: values,
            label: name,
            meta: meta as FieldState<string | number>,
            name,
            value: input.value,
          })
        : undefined,
    [getFirstError, input.value, meta, name, values],
  )

  return (
    <SelectableCard
      isError={!!error}
      showTick={showTick}
      checked={input.checked}
      className={className}
      disabled={disabled}
      name={input.name}
      onChange={event => {
        input.onChange(event)
        onChange?.(event)
      }}
      onBlur={event => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onFocus={event => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      type={type}
      value={input.value}
      id={id}
    >
      {children}
    </SelectableCard>
  )
}

export default SelectableCardField
