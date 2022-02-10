import { Tags } from '@scaleway/ui'
import React, { ComponentProps } from 'react'
import { useField } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { BaseFieldProps } from '../../types'

export type TagsFieldProps<T = unknown, K = string> = BaseFieldProps<T, K> & {
  className?: string
  disabled?: boolean
  id?: string
  name: string
  placeholder: string
  required?: boolean
  tags?: ComponentProps<typeof Tags>['tags']
  variant?: ComponentProps<typeof Tags>['variant']
}

const TagsField = ({
  className,
  disabled,
  id,
  name,
  placeholder,
  required,
  variant,
  validate,
  tags,
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
      onChange={input.onChange}
      placeholder={placeholder}
      variant={variant}
      tags={tags}
    />
  )
}

export default TagsField
