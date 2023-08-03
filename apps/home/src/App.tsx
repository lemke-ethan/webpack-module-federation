import "./styles/App.css"
import React from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./Header";
import { Footer } from "./Footer";

function App() {
    return (
        <div className="app">
            <Header />
            <div className="content">Home page content</div>
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