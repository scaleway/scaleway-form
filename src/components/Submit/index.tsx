import { Button } from '@scaleway/ui'
import React, { ReactNode } from 'react'
import { useFormState } from 'react-final-form'

export type SubmitProps = {
  children?: ReactNode
}

const Submit = ({ children }: SubmitProps): JSX.Element => {
  const { invalid, submitting } = useFormState()

  return (
    <Button
      progress={submitting}
      disabled={submitting || invalid}
      variant="success"
      type="submit"
    >
      {children}
    </Button>
  )
}

export default Submit
