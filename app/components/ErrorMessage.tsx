import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text color='orange' as='p'>{children}</Text>
  )
}

export default ErrorMessage