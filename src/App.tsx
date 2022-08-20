import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Authentication/Login";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="login/*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
