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

type CheckboxValue = NonNullable<ComponentProps<typeof Checkbox>['checked']>

type CheckboxFieldProps<T = CheckboxValue, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof Checkbox>,
      | 'checked'
      | 'disabled'
      | 'id'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'progress'
      | 'readOnly'
      | 'required'
      | 'size'
      | 'typographyVariant'
      | 'valid'
    >
  > & {
    name: string
    label?: string
    className?: string
    children?: ReactNode
  }

const CheckboxField = forwardRef(
  (
    {
      validate,
      name,
      label = '',
      valid,
      size,
      progress,
      disabled,
      required,
      typographyVariant,
      checked,
      id,
      className,
      children,
      onChange,
      onBlur,
      onFocus,
    }: CheckboxFieldProps,
    ref: Ref<HTMLInputElement>,
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
      value: checked,
    })

    const error = useMemo(
      () =>
        meta.error
          ? getFirstError({
              allValues: values,
              label,
              meta: meta as FieldState<boolean | undefined>,
              name,
              value: input.checked,
            })
          : undefined,
      [getFirstError, input.checked, label, meta, name, values],
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
        type={input.type}
        valid={valid}
        size={size}
        progress={progress}
        disabled={disabled}
        required={required}
        typographyVariant={typographyVariant}
        checked={input.value}
        id={id}
        error={error}
        ref={ref}
        className={className}
      >
        {children}
      </Checkbox>
    )
  },
)

export default CheckboxField
