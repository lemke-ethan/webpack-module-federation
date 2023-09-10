import React, { useState } from "react"

export function CartContent() {
    const [token, setToken] = useState<string>("")

    return (
        <div className="cart-content">
            JWT: {token}
        </div>
    )
}