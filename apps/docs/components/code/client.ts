'use client'
import { JSX, useLayoutEffect, useState } from 'react'
import { highlight } from './shared'
import { BundledLanguage } from 'shiki/bundle/web'
import { useTheme } from 'next-themes'


type Props = {
    code: string,
    lang: BundledLanguage,
    initial?: JSX.Element
}


export function CodeBlock({ code, lang, initial }: Props) {
  const [nodes, setNodes] = useState(initial)
  const { resolvedTheme } = useTheme()  
  
  useLayoutEffect(() => {
    // Wait for theme to be resolved before highlighting
    if (resolvedTheme !== undefined) {
      void highlight({ code, lang, dark: resolvedTheme === 'dark' }).then(setNodes).catch(console.error)
    } else {
      // Fallback to dark theme while waiting for theme resolution
      void highlight({ code, lang, dark: true }).then(setNodes).catch(console.error)
    }
  }, [code, lang, resolvedTheme])

  return nodes ?? null
}