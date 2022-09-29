import { Tags } from '@scaleway/ui'
import { ComponentProps } from 'react'
import { useField } from 'react-final-form'
import { pickValidators } from '../../helpers'
import { useValidation } from '../../hooks'
import { BaseFieldProps } from '../../types'

export type TagsFieldProps<T = unknown, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<ComponentProps<typeof Tags>, 'tags' | 'variant' | 'onChange'>
  > & {
    className?: string
    disabled?: boolean
    id?: string
    name: string
    placeholder: string
    required?: boolean
  }

export const TagsField = ({
  className,
  disabled,
  id,
  name,
  onChange,
  placeholder,
  required,
  tags,
  validate,
  variant,
}: TagsFieldProps): JSX.Element => {
  const validateFn = useValidation({
    validate,
    validators: pickValidators({
      required,
    }),
  })

  const { input } = useField(name, {
    type: 'text',
    validate: validateFn,
  })

  return (
    <Tags
      className={className}
      disabled={disabled}
      id={id}
      name={name}
      onChange={event => {
        onChange?.(event)
        input.onChange(event)
      }}
      placeholder={placeholder}
      variant={variant}
      tags={tags}
    />
  )
}
