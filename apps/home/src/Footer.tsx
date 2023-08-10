import "./styles/Footer.css"
import React from "react"
import { FooterComponent } from "home"

export const Footer: FooterComponent = (props) => {
    return (
        <div className="footer">
            <p>Only the best spinners</p>
            <p>{props.copyright}</p>
        </div>
    )
}