import { TextBox } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, {
  ComponentProps,
  FocusEvent,
  Ref,
  forwardRef,
  useMemo,
} from 'react'
import { useField, useFormState } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type TextBoxValue = NonNullable<ComponentProps<typeof TextBox>['value']>

type TextBoxFieldProps<T = TextBoxValue, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof TextBox>,
      | 'autoCapitalize'
      | 'autoComplete'
      | 'autoCorrect'
      | 'autoFocus'
      | 'autoSave'
      | 'cols'
      | 'disabled'
      | 'id'
      | 'label'
      | 'maxLength'
      | 'minLength'
      | 'multiline'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'rows'
      | 'type'
      | 'value'
    >
  > & {
    name: string
    className?: string
    max?: number
    min?: number
    regex?: RegExp[]
  }

const TextBoxField = forwardRef(
  (
    {
      afterSubmit,
      allowNull,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      autoFocus,
      autoSave,
      beforeSubmit,
      className,
      cols,
      data,
      defaultValue,
      disabled,
      format,
      formatOnBlur,
      id,
      initialValue,
      isEqual,
      label = '',
      max,
      maxLength,
      min,
      minLength,
      multiline,
      multiple,
      name,
      onBlur,
      onChange,
      onFocus,
      parse,
      placeholder,
      readOnly,
      regex,
      required,
      rows,
      subscription,
      type,
      validate,
      validateFields,
      value,
    }: TextBoxFieldProps,
    ref: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const { values } = useFormState()
    const { getFirstError } = useErrors()

    const validateFn = useValidation<TextBoxValue>({
      validate,
      validators: pickValidators({
        max,
        maxLength,
        min,
        minLength,
        regex,
        required,
      }),
    })

    const { input, meta } = useField(name, {
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
      type,
      validate: validateFn,
      validateFields,
      value,
    })

    const error = useMemo(
      () =>
        meta.error && meta.touched
          ? getFirstError<string>({
              allValues: values,
              label,
              max,
              maxLength,
              meta: meta as FieldState<string>,
              min,
              minLength,
              name,
              regex,
              value: input.value,
            })
          : undefined,
      [
        getFirstError,
        input.value,
        label,
        max,
        maxLength,
        meta,
        min,
        minLength,
        name,
        regex,
        values,
      ],
    )

    return (
      <TextBox
        name={input.name}
        onChange={event => {
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
        value={input.value}
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        max={max}
        required={required}
        readOnly={readOnly}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        autoSave={autoSave}
        multiline={multiline}
        cols={cols}
        rows={rows}
        id={id}
        error={error}
        ref={ref}
        className={className}
      />
    )
  },
)

export default TextBoxField
