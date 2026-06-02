'use client'

export function DecorativeCircle({
  size = 'md',
  position = 'absolute',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  position?: string
  className?: string
}) {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-72 h-72',
  }

  return (
    <div
      className={`${position} ${sizeMap[size]} bg-accent rounded-full opacity-20 blur-3xl ${className}`}
    ></div>
  )
}

export function DecorativeSquare({
  size = 'md',
  position = 'absolute',
  rotation = 45,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg'
  position?: string
  rotation?: number
  className?: string
}) {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }

  return (
    <div
      className={`${position} ${sizeMap[size]} border-2 border-accent ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    ></div>
  )
}

export function DecorativeLine({
  orientation = 'vertical',
  position = 'absolute',
  className = '',
}: {
  orientation?: 'vertical' | 'horizontal'
  position?: string
  className?: string
}) {
  return orientation === 'vertical' ? (
    <div
      className={`${position} w-0.5 h-32 bg-accent opacity-30 ${className}`}
    ></div>
  ) : (
    <div
      className={`${position} w-32 h-0.5 bg-accent opacity-30 ${className}`}
    ></div>
  )
}
