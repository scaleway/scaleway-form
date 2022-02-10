import { RadioBorderedBox } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, {
  ComponentProps,
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  ReactNode,
  useMemo,
} from 'react'
import { useField, useFormState } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type RadioBorderedBoxValue = NonNullable<
  ComponentProps<typeof RadioBorderedBox>['value']
>

type RadioBorderedBoxFieldProps<
  T = RadioBorderedBoxValue,
  K = string,
> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof RadioBorderedBox>,
      'labelDescription' | 'badgeSize' | 'badgeText' | 'badgeVariant' | 'size'
    >
  > & {
    label: string
    name: string
    valid?: boolean
    disabled?: boolean
    required?: boolean
    value: RadioBorderedBoxValue
    children?: ReactNode
    onChange?: FormEventHandler<HTMLInputElement>
    onBlur?: FocusEventHandler<HTMLInputElement>
    onFocus?: FocusEventHandler<HTMLInputElement>
  }

const RadioBorderedBoxField = ({
  validate,
  name,
  valid,
  label,
  labelDescription,
  badgeSize,
  badgeText,
  badgeVariant,
  size,
  disabled,
  required,
  value,
  children,
  onChange,
  onBlur,
  onFocus,
}: RadioBorderedBoxFieldProps): JSX.Element => {
  const { values } = useFormState()
  const { getFirstError } = useErrors()

  const validateFn = useValidation<RadioBorderedBoxValue>({
    validate,
    validators: pickValidators({
      required,
    }),
  })

  const { input, meta } = useField(name, {
    type: 'radio',
    validate: validateFn,
    value,
  })

  const error = useMemo(
    () =>
      meta.error
        ? getFirstError({
            allValues: values,
            label,
            meta: meta as FieldState<string | number>,
            name,
            value: input.value,
          })
        : undefined,
    [getFirstError, input.value, label, meta, name, values],
  )

  return (
    <RadioBorderedBox
      label={label}
      labelDescription={labelDescription}
      badgeSize={badgeSize}
      badgeText={badgeText}
      badgeVariant={badgeVariant}
      name={input.name}
      onChange={(event: FormEvent<HTMLInputElement>) => {
        input.onChange(event)
        onChange?.(event)
      }}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onFocus={(event: FocusEvent<HTMLInputElement>) => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      size={size}
      disabled={disabled}
      checked={input.checked}
      value={input.value}
      error={error}
      valid={valid}
    >
      {children}
    </RadioBorderedBox>
  )
}

export default RadioBorderedBoxField
