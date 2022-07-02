import { Button } from '@scaleway/ui'
import React, { ComponentProps, ReactNode } from 'react'
import { useFormState } from 'react-final-form'

type SubmitProps = {
  action?: ComponentProps<typeof Button>['action']
  children?: ReactNode
  className?: string
  disabled?: boolean
  icon?: ComponentProps<typeof Button>['icon']
  iconPosition?: ComponentProps<typeof Button>['iconPosition']
  tooltip?: ComponentProps<typeof Button>['tooltip']
  tooltipBaseId?: ComponentProps<typeof Button>['tooltipBaseId']
  variant?: ComponentProps<typeof Button>['variant']
}

const Submit = ({
  action,
  children,
  className,
  disabled = false,
  icon,
  iconPosition,
  tooltip,
  tooltipBaseId,
  variant = 'success',
}: SubmitProps): JSX.Element => {
  const { invalid, submitting, hasValidationErrors, dirtySinceLastSubmit } =
    useFormState({
      subscription: {
        dirtySinceLastSubmit: true,
        hasValidationErrors: true,
        invalid: true,
        submitting: true,
      },
    })
  const isDisabled =
    disabled ||
    submitting ||
    (invalid && hasValidationErrors && !dirtySinceLastSubmit)

  return (
    <Button
      action={action}
      className={className}
      disabled={isDisabled}
      icon={icon}
      iconPosition={iconPosition}
      progress={submitting}
      type="submit"
      tooltip={tooltip}
      tooltipBaseId={tooltipBaseId}
      variant={variant}
    >
      {children}
    </Button>
  )
}

export default Submit
