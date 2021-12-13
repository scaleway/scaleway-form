import { Box, Switch, Typography } from '@scaleway/ui'
import React, { ReactNode } from 'react'
import { useField } from 'react-final-form'
import pickUseFieldProps from '../../helpers/pickUseFieldProps'
import { AnyValue, BaseFieldProps } from '../../types'

export type SwitchFieldProps<T = AnyValue, K = AnyValue> = BaseFieldProps<
  T,
  K
> & {
  required?: boolean
  label?: string
  variant?: 'primary' | 'success'
  size?: 'small' | 'medium'
  tooltip?: string
  width?: number
  labeled?: 'inside' | 'left' | 'right' | boolean
  offLabel?: ReactNode
  onLabel?: ReactNode
  name: string
  disabled?: boolean
}
const SwitchField = ({
  required,
  label,
  variant,
  size = 'small',
  tooltip,
  width,
  onLabel = 'ON',
  offLabel = 'OFF',
  labeled,
  name,
  defaultValue,
  disabled,
  ...props
}: SwitchFieldProps) => {
  const { input } = useField(name, {
    ...pickUseFieldProps(props),
    type: 'checkbox',
  })

  return (
    <Box display="flex" alignItems="center">
      <Switch
        checked={input.checked}
        variant={variant}
        width={width}
        tooltip={tooltip}
        onChange={input.onChange}
        onLabel={onLabel}
        offLabel={offLabel}
        labeled={labeled}
        size={size}
        name={name}
        disabled={disabled}
      />
      {label && (
        <Typography ml={1} color={input.checked ? 'primary' : 'gray950'}>
          {label}
        </Typography>
      )}
    </Box>
  )
}

export default SwitchField
