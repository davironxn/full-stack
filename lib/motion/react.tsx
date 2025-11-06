"use client"

import * as React from "react"
import type { JSX as ReactJSX } from "react"

type Transition = {
  duration?: number
  delay?: number
  ease?: [number, number, number, number]
  type?: string
  stiffness?: number
  damping?: number
}

type TransformStyle = {
  x?: number | string
  y?: number | string
  scale?: number | string
  rotateY?: number | string
}

type MotionStyle = React.CSSProperties & TransformStyle

type IntrinsicTag = keyof ReactJSX.IntrinsicElements

type MotionProps<T extends IntrinsicTag> =
  React.ComponentPropsWithoutRef<T> & {
    initial?: MotionStyle
    animate?: MotionStyle
    whileHover?: MotionStyle
    whileTap?: MotionStyle
    transition?: Transition
  }

function mergeStyle(style: MotionStyle | undefined): React.CSSProperties {
  if (!style) return {}

  const { x, y, scale, rotateY, transform: existingTransform, ...rest } = style
  const transforms: string[] = []

  if (x !== undefined) {
    transforms.push(`translateX(${typeof x === "number" ? `${x}px` : x})`)
  }

  if (y !== undefined) {
    transforms.push(`translateY(${typeof y === "number" ? `${y}px` : y})`)
  }

  if (scale !== undefined) {
    transforms.push(`scale(${scale})`)
  }

  if (rotateY !== undefined) {
    const value = typeof rotateY === "number" ? `${rotateY}deg` : rotateY
    transforms.push(`rotateY(${value})`)
  }

  const computed: React.CSSProperties = { ...rest }

  if (transforms.length > 0) {
    computed.transform = [existingTransform, transforms.join(" ")]
      .filter(Boolean)
      .join(" ")
  } else if (existingTransform) {
    computed.transform = existingTransform
  }

  return computed
}

function applyTransitionStyle(
  transition: Transition | undefined
): React.CSSProperties {
  if (!transition) return {}

  const styles: React.CSSProperties = {
    transitionProperty: "all",
  }

  if (transition.duration !== undefined) {
    styles.transitionDuration = `${transition.duration}s`
  }

  if (transition.delay !== undefined) {
    styles.transitionDelay = `${transition.delay}s`
  }

  if (transition.ease) {
    styles.transitionTimingFunction = `cubic-bezier(${transition.ease.join(",")})`
  }

  return styles
}

function createMotionComponent<T extends IntrinsicTag>(Tag: T) {
  const TagComponent = Tag as unknown as React.ElementType

  const Component = React.forwardRef<any, MotionProps<T>>(function MotionComponent(
    {
      initial,
      animate,
      whileHover,
      whileTap,
      transition,
      style,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onPointerUp,
      ...props
    },
    forwardedRef
  ) {
    const [mounted, setMounted] = React.useState(false)
    const [hovered, setHovered] = React.useState(false)
    const [pressed, setPressed] = React.useState(false)

    React.useEffect(() => {
      const id = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(id)
    }, [])

    const baseStyle = React.useMemo(() => {
      const computed: React.CSSProperties = {}

      if (!mounted && initial) {
        Object.assign(computed, mergeStyle(initial))
      }

      if (mounted && animate) {
        Object.assign(computed, mergeStyle(animate))
      }

      if (hovered && whileHover) {
        Object.assign(computed, mergeStyle(whileHover))
      }

      if (pressed && whileTap) {
        Object.assign(computed, mergeStyle(whileTap))
      }

      Object.assign(computed, applyTransitionStyle(transition))

      return computed
    }, [initial, animate, whileHover, whileTap, transition, mounted, hovered, pressed])

    return (
      <TagComponent
        {...(props as React.ComponentPropsWithoutRef<T>)}
        ref={forwardedRef as any}
        style={{ ...baseStyle, ...style }}
        onMouseEnter={(event: React.MouseEvent<any>) => {
          setHovered(true)
          onMouseEnter?.(event as any)
        }}
        onMouseLeave={(event: React.MouseEvent<any>) => {
          setHovered(false)
          onMouseLeave?.(event as any)
        }}
        onPointerDown={(event: React.PointerEvent<any>) => {
          setPressed(true)
          onPointerDown?.(event as any)
        }}
        onPointerUp={(event: React.PointerEvent<any>) => {
          setPressed(false)
          onPointerUp?.(event as any)
        }}
      />
    )
  })

  return Component
}

export const motion = {
  section: createMotionComponent("section"),
  div: createMotionComponent("div"),
}

export type { MotionProps }
