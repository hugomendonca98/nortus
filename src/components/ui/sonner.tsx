'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'flex items-start md:!w-[500px]',
          cancelButton: '!bg-transparent !text-white',
          actionButton: '!bg-transparent !text-white',
          success: '!flex !items-start',
        },
      }}
      style={
        {
          '--normal-bg': 'var(--bright-navy-blue)',
          '--normal-text': 'white',
          '--normal-border': 'transparent',
          '--success-bg': 'var(--bright-navy-blue)',
          '--success-text': 'white',
          '--success-border': 'transparent',
          '--error-bg': 'var(--destructive)',
          '--error-text': 'white',
          '--error-border': 'transparent',
          '--warning-bg': 'var(--yellow)',
          '--warning-text': 'var(--dark-blue)',
          '--warning-border': 'transparent',
          '--info-bg': 'var(--teal)',
          '--info-text': 'white',
          '--info-border': 'transparent',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
