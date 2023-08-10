import React from "react";
import { createRoot } from "react-dom/client";
import { Header } from "home/Header";
import { Footer } from "home/Footer";

function App() {
    return (
        <div className="app">
            <Header />
            <div>PDP</div>
            <Footer />
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