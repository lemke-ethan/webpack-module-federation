import React from "react";
import { createRoot } from "react-dom/client";

function App() {
    return (
        <div className="app">
            <div>PDP</div>
        </div>
    )
}

const rootElement = document.getElementById("root");
if (rootElement === null) {
    throw new Error("Failed to find the application's root element.")
}
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);