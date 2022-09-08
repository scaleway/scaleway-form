import { TextBox } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, { ComponentProps, FocusEvent, Ref, forwardRef } from 'react'
import { useField } from 'react-final-form'
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
      | 'generated'
      | 'id'
      | 'label'
      | 'maxLength'
      | 'minLength'
      | 'multiline'
      | 'notice'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'onKeyDown'
      | 'onKeyUp'
      | 'placeholder'
      | 'random'
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
      generated,
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
      notice,
      onBlur,
      onChange,
      onFocus,
      onKeyUp,
      onKeyDown,
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
    }: TextBoxFieldProps,
    ref: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const { getError } = useErrors()

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

    const error = getError({
      label,
      max,
      maxLength,
      meta: meta as FieldState<unknown>,
      min,
      minLength,
      name,
      regex,
      value: input.value,
    })

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
        generated={generated}
        id={id}
        label={label}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
        multiline={multiline}
        name={input.name}
        notice={notice}
        onBlur={(event: FocusEvent<HTMLInputElement>) => {
          input.onBlur(event)
          onBlur?.(event)
        }}
        onChange={event => {
          input.onChange(event)
          onChange?.(event)
        }}
        onFocus={(event: FocusEvent<HTMLInputElement>) => {
          input.onFocus(event)
          onFocus?.(event)
        }}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
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
