'use client'

import React, { useState, useEffect } from 'react'
import useThemeContext from '../hooks/useThemeContext'

interface ClientOnlyProps {
  children: React.ReactNode
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false)

  const { mode } = useThemeContext()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <div id="client" className={mode}>
      {children}
    </div>
  )
}

export default ClientOnly
