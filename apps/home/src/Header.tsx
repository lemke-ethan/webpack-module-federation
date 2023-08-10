import "./styles/Header.css"
import React from "react";
import { HeaderComponent } from "home"

export const Header: HeaderComponent = (props) => {
    return (
        <div className="header">
            <h1>Fidget Spinner World</h1>
            <p>{props.subHeader}</p>
        </div>
    )
}