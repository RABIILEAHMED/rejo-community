import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

// Components (Landing Page Sections)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Mentorship from "./components/Mentorship";
import PDFBooks from "./components/PDFBooks";
import Footer from "./components/Footer";
import StoriesSection from "./components/DailySignalsSection";

// Landing Page Home Component
const Home = () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>RejoCommunity</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <Navbar />
    <Hero />
    <Courses />
    <Mentorship />
    <StoriesSection />
    <PDFBooks />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Waan tirtiray login, register, dashboard, ProtectedRoute, AdminRoute */}
      </Routes>
    </Router>
  );
}

export default App;
