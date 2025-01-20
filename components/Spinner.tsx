import { LoaderCircle } from 'lucide-react'
import React from 'react'

interface Props {
  className?: string
}

export function Spinner({ className }: Props) {
  return (
    <div className="right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
      <LoaderCircle className={`${className ?? ""} animate-spin`} />
    </div>
  )
}
