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
      | 'notice'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'placeholder'
      | 'random'
      | 'readOnly'
      | 'required'
      | 'rows'
      | 'type'
      | 'value'
      | 'size'
    >
  > & {
    name: string
    className?: string
    regex?: (RegExp | RegExp[])[]
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
      maxLength,
      minLength,
      multiline,
      multiple,
      name,
      notice,
      onBlur,
      onChange,
      onFocus,
      parse,
      placeholder,
      random,
      readOnly,
      regex,
      required,
      rows,
      subscription,
      type,
      validate,
      validateFields,
      value,
      size,
    }: TextBoxFieldProps,
    ref: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const { values } = useFormState()
    const { getFirstError } = useErrors()

    const validateFn = useValidation<TextBoxValue>({
      validate,
      validators: pickValidators({
        maxLength,
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
              maxLength,
              meta: meta as FieldState<string>,
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
        maxLength,
        meta,
        minLength,
        name,
        regex,
        values,
      ],
    )

    return (
      <TextBox
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        autoSave={autoSave}
        className={className}
        cols={cols}
        disabled={disabled}
        error={error}
        id={id}
        label={label}
        size={size}
        maxLength={maxLength}
        minLength={minLength}
        multiline={multiline}
        name={input.name}
        notice={notice}
        onBlur={(event: FocusEvent<HTMLTextAreaElement>) => {
          input.onBlur(event)
          onBlur?.(event)
        }}
        onChange={event => {
          input.onChange(event)
          onChange?.(event)
        }}
        onFocus={(event: FocusEvent<HTMLTextAreaElement>) => {
          input.onFocus(event)
          onFocus?.(event)
        }}
        placeholder={placeholder}
        random={random}
        readOnly={readOnly}
        ref={ref}
        required={required}
        rows={rows}
        type={input.type}
        value={input.value}
      />
    )
  },
)

export default TextBoxField
