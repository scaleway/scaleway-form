import { Button } from '@scaleway/ui'
import React, { ComponentProps, ReactNode } from 'react'
import { useFormState } from 'react-final-form'

type SubmitProps = {
  children?: ReactNode
  disabled?: boolean
  className?: string
  variant?: ComponentProps<typeof Button>['variant']
}

const Submit = ({ children, disabled = false, variant = "success", className }: SubmitProps): JSX.Element => {
  const { invalid, submitting } = useFormState()

  return (
    <Button
      progress={submitting}
      disabled={disabled || submitting || invalid}
      variant={variant}
      type="submit"
      className={className}
    >
      {children}
    </Button>
  )
}

export default Submit
