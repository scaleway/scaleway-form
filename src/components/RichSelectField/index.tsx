import { RichSelect } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, {
  Children,
  ComponentProps,
  ReactElement,
  useCallback,
  useMemo,
} from 'react'
import { useField, useFormState } from 'react-final-form'
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
> = BaseFieldProps<T> &
  Pick<
    RichSelectProps,
    | 'animation'
    | 'animationDuration'
    | 'animationOnChange'
    | 'children'
    | 'className'
    | 'disabled'
    | 'error'
    | 'id'
    | 'inputId'
    | 'isClearable'
    | 'isMulti'
    | 'isSearchable'
    | 'onBlur'
    | 'onChange'
    | 'onFocus'
    | 'options'
    | 'placeholder'
    | 'readOnly'
    | 'required'
    | 'value'
  > & {
    label?: string
    maxLength?: number
    minLength?: number
    name: string
  }

const identity = <T,>(x: T) => x

const RichSelectField = <
  T extends RichSelectOptionOrGroup = RichSelectOptionOrGroup,
>({
  animation,
  animationDuration,
  animationOnChange,
  children,
  className,
  error: errorProp,
  format: formatProp = identity as NonNullable<BaseFieldProps<T>['format']>,
  formatOnBlur,
  id,
  inputId,
  isClearable,
  isSearchable,
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
  readOnly,
  required,
  value,
}: RichSelectFieldProps<T>) => {
  const { values } = useFormState()
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

  const format = useCallback(
    (val: T) => {
      if (multiple) return formatProp(val, name) as RichSelectOption

      const find = (opts: RichSelectOptionOrGroup[], valueToFind: string) =>
        opts?.find(option => (option as RichSelectOption).value === valueToFind)

      let selected: unknown = ''
      if (val && options) {
        selected = find(
          options as unknown as RichSelectOptionOrGroup[],
          val as unknown as string,
        )

        if (!selected) {
          selected =
            options.find(curr =>
              find(
                (curr as unknown as { options: RichSelectOptionOrGroup[] })
                  .options,
                val as unknown as string,
              ),
            ) ?? ''
        }
      }

      return formatProp(selected as T, name) as RichSelectOption
    },
    [formatProp, multiple, name, options],
  )

  const { input, meta } = useField<T, HTMLElement, RichSelectOption>(name, {
    format,
    formatOnBlur,
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
          allValues: values,
          label,
          meta: meta as FieldState<T | undefined>,
          name,
          value,
        })
      : undefined
  }, [getFirstError, label, meta, name, value, errorProp, values])

  return (
    <RichSelect
      animation={animation}
      animationDuration={animationDuration}
      animationOnChange={animationOnChange}
      className={className}
      error={error}
      id={id}
      inputId={inputId}
      isClearable={isClearable}
      isMulti={input.multiple}
      isSearchable={isSearchable}
      name={name}
      onBlur={event => {
        onBlur?.(event)
        input.onBlur(event)
      }}
      onChange={(event, action) => {
        onChange?.(event, action)
        input.onChange(event)
      }}
      onFocus={event => {
        onFocus?.(event)
        input.onFocus(event)
      }}
      options={options}
      placeholder={placeholder}
      readOnly={readOnly}
      value={input.value}
    >
      {children}
    </RichSelect>
  )
}

RichSelectField.Option = RichSelect.Option

export default RichSelectField
