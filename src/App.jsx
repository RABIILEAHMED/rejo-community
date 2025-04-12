import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthProvider } from "./context/AuthContext.jsx";

// Components (landing sections)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Mentorship from "./components/Mentorship";
import PDFBooks from "./components/PDFBooks";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadVideo from "./pages/UploadVideo";
import ProtectedRoute from "./routes/ProtectedRoute";
import StoriesSection from "./components/DailySignalsSection.jsx";

// 👇 Home page layout oo sections-ka wada
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
    <StoriesSection/>
    <PDFBooks />
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Video Upload Page */}
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <UploadVideo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
