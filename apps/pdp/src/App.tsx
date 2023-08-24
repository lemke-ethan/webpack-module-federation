import React from "react";
import { createRoot } from "react-dom/client";
import { Header } from "home/Header";
import { Footer } from "home/Footer";
import { PdpContent } from "./PdpContent";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader } from "./routes/pdpContent";

const router = createBrowserRouter([
    {
        path: "/product/:id",
        element: <App />,
        loader: loader
    }
]);

function App() {
    return (
        <div className="app">
            <Header subHeader="PDP" />
            <div className="content">
                <PdpContent />
            </div>
            <Footer copyright="2023" />
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
        <RouterProvider router={router} />
    </React.StrictMode>
);