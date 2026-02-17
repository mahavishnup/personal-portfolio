'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface MarkdownEditorProps {
  name: string
  defaultValue?: string
  placeholder?: string
}

export function MarkdownEditor({
  name,
  defaultValue = '',
  placeholder = '# Write your blog post here...\n\nUse **bold**, *italic*, `code`, and more!',
}: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue)
  const { resolvedTheme } = useTheme()

  return (
    <div data-color-mode={resolvedTheme === 'dark' ? 'dark' : 'light'}>
      <input type="hidden" name={name} value={value} />
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || '')}
        preview="edit"
        height={500}
        textareaProps={{
          placeholder,
        }}
        visibleDragbar={true}
      />
    </div>
  )
}
