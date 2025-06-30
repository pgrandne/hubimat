'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface AutosizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number
  maxHeight?: number
}

export const AutosizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutosizeTextareaProps
>(({ className, minHeight = 16, maxHeight = 300, ...props }, ref) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null)

  React.useImperativeHandle(ref, () => textAreaRef.current!)

  const resizeTextarea = () => {
    const el = textAreaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
    }
  }

  React.useEffect(() => {
    resizeTextarea()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  return (
    <textarea
      {...props}
      ref={textAreaRef}
      onChange={(e) => {
        resizeTextarea()
        props.onChange?.(e)
      }}
      className={cn(
        'w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 resize-none overflow-hidden',
        className
      )}
      style={{ minHeight }}
    />
  )
})

AutosizeTextarea.displayName = 'AutosizeTextarea'
