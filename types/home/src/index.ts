import { ReactElement } from "react"

export declare function Header(props: { subHeader: string }): ReactElement
export declare function Footer(props: { copyright: string }): ReactElement
export type HeaderComponent = typeof Header
export type FooterComponent = typeof Footer
export const packageNamespace = "home"