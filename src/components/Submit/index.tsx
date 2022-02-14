import { Button } from '@scaleway/ui'
import React, { ComponentProps, ReactNode } from 'react'
import { useFormState } from 'react-final-form'

type SubmitProps = {
  children?: ReactNode
  disabled?: boolean
  className?: string
  variant?: ComponentProps<typeof Button>['variant']
}

const Submit = ({
  children,
  disabled = false,
  variant = 'success',
  className,
}: SubmitProps): JSX.Element => {
  const { invalid, submitting, hasValidationErrors, dirtySinceLastSubmit } = useFormState({
    subscription: {
      dirtySinceLastSubmit: true,
      hasValidationErrors: true,
      invalid: true,
      submitting: true,
    },
  })

  return (
    <Button
      progress={submitting}
      disabled={disabled || submitting || (invalid && hasValidationErrors && !dirtySinceLastSubmit)}
      variant={variant}
      type="submit"
      className={className}
    >
      {children}
    </Button>
  )
}

export default Submit
