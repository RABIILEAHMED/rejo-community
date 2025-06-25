import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Mentorship from "./components/Mentorship";
import PDFBooks from "./components/PDFBooks";
import Footer from "./components/Footer";
import StoriesSection from "./components/DailySignalsSection";
// import Updates from './components/Updates';
import ChangeYourLifeNow from './components/ChangeYourLifeNow';

// Home Page Layout
const Home = () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>RejoCommunity</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/updates" element={<Updates />} /> */}
        <Route path="/changeyourlife" element={<ChangeYourLifeNow />} />
      </Routes>
    </Router>
  );
}

export default App;
