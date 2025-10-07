'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--success-bg': 'hsl(120, 60%, 95%)',
          '--success-text': 'hsl(120, 100%, 20%)',
          '--success-border': 'hsl(120, 60%, 80%)',
          '--error-bg': 'hsl(0, 60%, 95%)',
          '--error-text': 'hsl(0, 100%, 30%)',
          '--error-border': 'hsl(0, 60%, 80%)',
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          border: '1px solid var(--normal-border)',
          backgroundColor: 'var(--normal-bg)',
          color: 'var(--normal-text)',
        },
        classNames: {
          success: 'success-toast',
          error: 'error-toast',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
