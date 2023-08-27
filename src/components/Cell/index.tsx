import { useState, useRef, useEffect, CSSProperties, HTMLAttributes } from 'react'
import './index.css'

interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  cx: number
  theme: string | ThemeProps
  themeProps: ThemeProps
  dataLevel: number
  style: CSSProperties
  dataTooltip: string
  tooltipSize: number
}

export default function Cell({
  cx,
  theme,
  themeProps,
  dataLevel,
  style,
  dataTooltip,
  tooltipSize,
  ...otherProps
}: CellProps) {
  const cellRef = useRef<HTMLTableCellElement>(null)
  const [tooltipOffset, setTooltipOffset] = useState<number>(-10)

  const getVisibleChildren = (parent: Node | null) => {
    if (!parent) return 0

    let count = 0
    parent.childNodes.forEach((node: ChildNode) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const style = window.getComputedStyle(node as Element)
        if (style.display !== 'none') {
          count++
        }
      }
    })

    return count
  }

  const getVisibleCellIndex = (cell: HTMLTableCellElement | null) => {
    if (!cell || !cell.parentNode) return -1

    const allCells: HTMLElement[] = Array.from(cell.parentNode.childNodes) as HTMLElement[]

    let visibleIndex = 0

    for (let i = 0; i < cell.cellIndex; i++) {
      if (allCells[i].style.display !== 'none') {
        visibleIndex++
      }
    }

    return visibleIndex
  }

  useEffect(() => {
    const handleMouseOver = () => {
      if (cellRef.current) {
        const totalLength = getVisibleChildren(cellRef.current?.parentNode)
        const cellIndex = getVisibleCellIndex(cellRef.current)

        if (totalLength) {
          let offset = -10
          const ratio = cellIndex / totalLength

          if (ratio > 0.9) {
            offset = Math.max(~~(cellRef.current.cellIndex * -11 * cx) / totalLength, -10 * cx)
          } else if (ratio > 0.8) {
            offset = Math.max(~~(cellRef.current.cellIndex * -10 * cx) / totalLength, -9 * cx)
          } else if (ratio > 0.66) {
            offset = Math.max(~~(cellRef.current.cellIndex * -8 * cx) / totalLength, -8 * cx)
          } else if (ratio > 0.33) {
            offset = Math.max(~~(cellRef.current.cellIndex * -6 * cx) / totalLength, -6 * cx)
          } else if (ratio > 0.2) {
            offset = Math.max(~~(cellRef.current.cellIndex * -4 * cx) / totalLength, -4 * cx)
          } else {
            offset = Math.max((~~cellRef.current.cellIndex * -2 * cx) / totalLength, -2 * cx)
          }
          setTooltipOffset(offset)
        }
      }
    }

    if (cellRef.current) {
      cellRef.current.addEventListener('mouseover', handleMouseOver)
    }

    return () => {
      if (cellRef.current) {
        cellRef.current.removeEventListener('mouseover', handleMouseOver)
      }
    }
  }, [])

  const isEmojiTheme = (theme: string | ThemeProps): boolean => {
    return theme === 'emoji_positive' || theme === 'emoji_negative'
  }

  return (
    <td
      ref={cellRef}
      className="calendar-cell top half-arrow"
      style={
        {
          ...style,
          outline: isEmojiTheme(theme) ? 'transparent' : '1px solid rgba(27, 31, 35, 0.06)',
          backgroundColor: isEmojiTheme(theme) ? 'transparent' : themeProps[`level${dataLevel}`],
          '--tooltip-offset': `${tooltipOffset}px`,
          fontSize: tooltipSize,
        } as React.CSSProperties
      }
      data-tooltip={dataTooltip}
      data-level={dataLevel}
      {...otherProps}
    >
      {isEmojiTheme(theme) ? themeProps[`level${dataLevel}`] : undefined}
    </td>
  )
}
