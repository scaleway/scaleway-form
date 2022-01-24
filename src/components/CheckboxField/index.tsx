import { Checkbox } from '@scaleway/ui'
import React, { ComponentProps, FocusEvent, FocusEventHandler, FormEvent, FormEventHandler, ReactNode, Ref, forwardRef, useMemo } from "react";
import { useField, useFormState } from 'react-final-form';
import pickValidators from '../../helpers/pickValidators';
import useValidation from '../../hooks/useValidation';
import { useErrors } from '../../providers/ErrorContext';
import { BaseFieldProps } from "../../types";

type CheckboxValue = NonNullable<ComponentProps<typeof Checkbox>['checked']>

export type CheckboxFieldProps<T = CheckboxValue, K = string> = BaseFieldProps<
  T,
  K
> & {
  name: string
  label?: string
  valid?: boolean
  size?: number
  progress?: boolean
  disabled?: boolean
  required?: boolean
  typographyVariant?: string
  checked?: CheckboxValue | undefined
  id?: string
  className?: string
  children?: ReactNode
  onChange?: FormEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
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
    })
  })

  const { input, meta } = useField(name, {
    initialValue: checked,
    validate: validateFn,
  })

  const error = useMemo(
    () =>
      meta.error
        ? getFirstError({
            allValues: values,
            label,
            name,
            value: input.checked,
        })
        : undefined,
    [
      getFirstError,
      input.checked,
      label,
      meta,
      name,
      values,
    ]
  )

  return (
    <Checkbox
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
})

export default CheckboxField