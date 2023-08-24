import "./styles/App.css"
import React from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { HomeContent } from "./HomeContent";

function App() {
    return (
        <div className="app">
            <Header subHeader="home" />
            <div className="content">
                <HomeContent />
            </div>
            <Footer copyright="F-Spinners 2023" />
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