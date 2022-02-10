import { Button } from '@scaleway/ui'
import React, { ReactNode } from 'react'
import { useFormState } from 'react-final-form'

type SubmitProps = {
  children?: ReactNode
  disabled?: boolean
  className?: string
}

const Submit = ({ children, disabled = false, className }: SubmitProps): JSX.Element => {
  const { invalid, submitting } = useFormState()

  return (
    <Button
      progress={submitting}
      disabled={disabled || submitting || invalid}
      variant="success"
      type="submit"
      className={className}
    >
      {children}
    </Button>
  )
}

export default Submit
