'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconSpinner, IconUser } from '@/components/ui/icons'

interface LoginButtonGoogleProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function LoginButtonGoogle({
  text = 'Login with Google',
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonGoogleProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        signIn('google', { callbackUrl: `/` })
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconUser className="mr-2" />
      ) : null}
      {text}
    </Button>
  )
}
