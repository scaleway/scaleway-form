import { RichSelect } from '@scaleway/ui'
import { FieldState } from 'final-form'
import {
  Children,
  ComponentProps,
  ReactElement,
  useCallback,
  useMemo,
} from 'react'
import { useFormField } from '../../hooks'
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
    | 'isLoading'
    | 'isMulti'
    | 'isSearchable'
    | 'menuPortalTarget'
    | 'onBlur'
    | 'onChange'
    | 'onFocus'
    | 'options'
    | 'placeholder'
    | 'readOnly'
    | 'required'
    | 'value'
    | 'noTopLabel'
    | 'noOptionsMessage'
  > & {
    label?: string
    maxLength?: number
    minLength?: number
    name: string
  }

const identity = <T,>(x: T) => x

export const RichSelectField = <
  T extends RichSelectOptionOrGroup = RichSelectOptionOrGroup,
>({
  animation,
  animationDuration,
  animationOnChange,
  children,
  className,
  disabled,
  error: errorProp,
  format: formatProp = identity as NonNullable<BaseFieldProps<T>['format']>,
  formatOnBlur,
  id,
  inputId,
  isClearable,
  isLoading,
  isSearchable,
  label = '',
  maxLength,
  menuPortalTarget,
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
  noTopLabel,
  noOptionsMessage,
}: RichSelectFieldProps<T>) => {
  const { getError } = useErrors()

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

      let selected:
        | RichSelectOptionOrGroup
        | (RichSelectOptionOrGroup | undefined)[]
        | string
        | undefined = ''

      if (val && options) {
        // TODO: find a proper way to simplify format with recursive options
        selected = find(
          options as unknown as RichSelectOptionOrGroup[],
          val as unknown as string,
        )

        if (!selected) {
          selected = options
            .map(curr =>
              find(
                (curr as unknown as { options: RichSelectOptionOrGroup[] })
                  .options,
                val as unknown as string,
              ),
            )
            .filter(identity)
          if (selected.length === 0) {
            selected = ''
          }
        }
      }

      return formatProp(selected as T, name) as RichSelectOption
    },
    [formatProp, multiple, name, options],
  )

  const { input, meta } = useFormField<T, HTMLElement, RichSelectOption>(name, {
    format,
    formatOnBlur,
    maxLength,
    minLength: minLength || required ? 1 : undefined,
    multiple,
    parse,
    required,
    value,
  })

  const error = getError({
    errorProp,
    label,
    meta: meta as FieldState<unknown>,
    name,
    value: input.value,
  })

  return (
    <RichSelect
      animation={animation}
      animationDuration={animationDuration}
      animationOnChange={animationOnChange}
      className={className}
      disabled={disabled}
      error={error}
      id={id}
      inputId={inputId}
      isClearable={isClearable}
      isLoading={isLoading}
      isMulti={input.multiple}
      isSearchable={isSearchable}
      menuPortalTarget={menuPortalTarget}
      name={name}
      onBlur={event => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onChange={(event, action) => {
        input.onChange(event)
        onChange?.(event, action)
      }}
      onFocus={event => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      options={options}
      placeholder={placeholder}
      readOnly={readOnly}
      value={input.value}
      noTopLabel={noTopLabel}
      required={required}
      noOptionsMessage={noOptionsMessage}
    >
      {children}
    </RichSelect>
  )
}

RichSelectField.Option = RichSelect.Option
