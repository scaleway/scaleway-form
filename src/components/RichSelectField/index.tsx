import { RichSelect } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, { Children, ComponentProps, ReactElement, useMemo } from 'react'
import { useField } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type RichSelectProps = ComponentProps<typeof RichSelect>
type RichSelectOptionProps = ComponentProps<typeof RichSelect.Option>
type RichSelectOptionElement = ReactElement<RichSelectOptionProps>
type RichSelectOptions = ComponentProps<typeof RichSelect>['options']
type RichSelectOptionOrGroup = NonNullable<RichSelectOptions>[number]
type RichSelectOption = { value: string; label: string }

export type RichSelectFieldProps<
  T extends RichSelectOptionOrGroup = RichSelectOptionOrGroup,
> = BaseFieldProps<T> & {
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  maxLength?: number
  minLength?: number
  name: string
  required?: boolean
  requiredMessage?: string
  children?: RichSelectOptionElement | RichSelectOptionElement[]
  placeholder?: string
  error?: boolean | string
  onChange?: (newValue: RichSelectOption | RichSelectOption[]) => void
  onBlur?: RichSelectProps['onBlur']
  onFocus?: RichSelectProps['onFocus']
  options?: RichSelectOptions
}

const identity = <T,>(x: T) => x

const RichSelectField = <
  T extends RichSelectOptionOrGroup = RichSelectOptionOrGroup,
>({
  children,
  className,
  error: errorProp,
  format: formatProp = identity as NonNullable<BaseFieldProps<T>['format']>,
  id,
  label = '',
  maxLength,
  minLength,
  multiple,
  name,
  onBlur,
  onChange,
  onFocus,
  options: optionsProp,
  parse: parseProp = identity as NonNullable<BaseFieldProps<T>['parse']>,
  placeholder,
  required,
  value,
}: RichSelectFieldProps<T>) => {
  const validate = useValidation({
    validators: pickValidators<T>({
      maxLength,
      minLength: minLength || required ? 1 : undefined,
      required,
    }),
  })

  const options = useMemo(
    () =>
      optionsProp ||
      ((
        Children.toArray(children)
          .flat()
          .filter(Boolean) as RichSelectOptionElement[]
      ).map(({ props: { children: labelChild, ...option } }) => ({
        ...option,
        label: labelChild,
      })) as RichSelectOptions),
    [optionsProp, children],
  )

  const parse = useMemo(
    () =>
      multiple
        ? parseProp
        : (option: unknown) =>
            parseProp((option as RichSelectOption)?.value ?? null, name),
    [multiple, parseProp, name],
  )

  const format = useMemo(() => {
    const find = (opts: RichSelectOptionOrGroup[], val: string) =>
      opts?.find(option => (option as RichSelectOption).value === val)

    return multiple
      ? formatProp
      : (val: T) =>
          formatProp(
            val && options
              ? find(options, val) ||
                  options.reduce(
                    (acc, curr) =>
                      find(curr.options as RichSelectOption[], val) || acc,
                    '',
                  )
              : '',
            name,
          )
  }, [formatProp, multiple, name, options])

  const { input, meta } = useField<T, HTMLElement, RichSelectOption>(name, {
    format,
    multiple,
    parse,
    validate,
    value,
  })

  const { getFirstError } = useErrors()
  const error = useMemo(() => {
    if (errorProp) return errorProp

    return meta.error
      ? getFirstError({
          allValues: value,
          label,
          meta: meta as FieldState<T | undefined>,
          name,
          value,
        })
      : undefined
  }, [getFirstError, label, meta, name, value, errorProp])

  return (
    <RichSelect
      className={className}
      error={error}
      id={id}
      label={label}
      isMulti={input.multiple}
      onBlur={event => {
        onBlur?.(event)
        input.onBlur(event)
      }}
      onChange={event => {
        onChange?.(event)
        input.onChange(event)
      }}
      onFocus={event => {
        onFocus?.(event)
        input.onFocus(event)
      }}
      options={options}
      placeholder={placeholder}
      value={input.value}
    >
      {children}
    </RichSelect>
  )
}

RichSelectField.Option = RichSelect.Option

export default RichSelectField
