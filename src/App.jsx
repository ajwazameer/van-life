import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import "/server";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">
          #VANLIFE
          {/* <img src="./assets/logog.svg" alt="vanlife-logo" /> */}
        </Link>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
