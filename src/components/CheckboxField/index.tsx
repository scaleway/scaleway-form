import { Checkbox } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, {
  ComponentProps,
  ReactNode,
  Ref,
  forwardRef,
  useMemo,
} from 'react'
import { useField, useFormState } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type CheckboxValue = string

type CheckboxFieldProps<T = CheckboxValue, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof Checkbox>,
      | 'disabled'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'progress'
      | 'size'
      | 'value'
    >
  > & {
    name: string
    label?: string
    className?: string
    children?: ReactNode
    required?: boolean
  }

const CheckboxField = forwardRef(
  (
    {
      validate,
      name,
      label = '',
      size,
      progress,
      disabled,
      required,
      className,
      children,
      onChange,
      onBlur,
      onFocus,
      value,
    }: CheckboxFieldProps,
    ref: Ref<HTMLLabelElement>,
  ): JSX.Element => {
    const { values } = useFormState()
    const { getFirstError } = useErrors()

    const validateFn = useValidation<CheckboxValue>({
      validate,
      validators: pickValidators({
        required,
      }),
    })

    const { input, meta } = useField(name, {
      type: 'checkbox',
      validate: validateFn,
      value,
    })

    const error = useMemo(
      () =>
        meta.error && meta.touched
          ? getFirstError({
              allValues: values,
              label,
              meta: meta as FieldState<string | boolean | undefined>,
              name,
              value: input.value ?? input.checked,
            })
          : undefined,
      [getFirstError, input.checked, label, meta, name, values, input.value],
    )

    return (
      <Checkbox
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
        size={size}
        progress={progress}
        disabled={disabled}
        checked={input.checked}
        error={error}
        ref={ref}
        className={className}
        value={input.value}
      >
        {children}
      </Checkbox>
    )
  },
)

export default CheckboxField
