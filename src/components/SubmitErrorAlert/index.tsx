import { Alert } from '@scaleway/ui'
import React from 'react'
import { FormSpy } from 'react-final-form'

const SubmitErrorAlert = <FormValues, >({ className }: { className?: string }) => (
  <FormSpy<FormValues> subscription={{ submitError: true }}>
    {({ submitError }) =>
      submitError ? (
        <Alert className={className} type="warning">
          {submitError}
        </Alert>
      ) : null
    }
  </FormSpy>
)

export default SubmitErrorAlert
