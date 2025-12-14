import "./Stacking.css"
import type { JSX } from "react"

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

export function HorizontalStack({children}: Props) {
    return <div className = "horizontal">{children}</div>
}

export function VerticalStack({children}: Props) {
    return <div className = "vertical">{children}</div>
}