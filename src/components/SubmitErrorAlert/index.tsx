import { Alert } from '@scaleway/ui'
import { FormSpy } from 'react-final-form'

export const SubmitErrorAlert = <FormValues,>({
  className,
}: {
  className?: string
}) => (
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
