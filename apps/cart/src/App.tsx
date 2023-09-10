import React from "react";
import { createRoot } from "react-dom/client";
import { Header } from "home/Header";
import { Footer } from "home/Footer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CartContent } from "./CartContent";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }
]);

function App() {
    return (
        <div className="app">
            <Header subHeader="Cart" />
            <div className="content">
                {/* 
                    TODO: first I was getting the app/home content, cleared all non-tracked files, rebuilt and now I am 
                    getting an empty response from the webpack dev server... 

                    https://youtu.be/lKKsjpH09dU?feature=shared&t=3977
                */}
                <CartContent />
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