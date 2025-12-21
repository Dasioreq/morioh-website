import "./Stacking.css"
import type { JSX } from "react"

type Props = {
    children: string | JSX.Element | JSX.Element[],
    style?: React.CSSProperties
}

export function HorizontalStack({children, style}: Props) {
    return <div style = {style} className = "horizontal">{children}</div>
}

export function VerticalStack({children, style}: Props) {
    return <div style = {style} className = "vertical">{children}</div>
}