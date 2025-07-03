import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga4";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Mentorship from "./components/Mentorship";
import PDFBooks from "./components/PDFBooks";
import Footer from "./components/Footer";
import StoriesSection from "./components/DailySignalsSection";
import ChangeYourLifeNow from './components/ChangeYourLifeNow';
import AnalyticsTracker from "./components/AnalyticsTracker";
import WelcomeModal from "./components/WelcomeModal";
import NotionJournal from './components/NotionJournal';

// ✅ Initialize GA4 once
ReactGA.initialize("G-63KSNK7E9X");

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
    <NotionJournal /> {/* ✅ Halkan ku dar */}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Navbar />
       <WelcomeModal /> {/* ✅ Modal-ka halkan ku dar */}
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/changeyourlife" element={<ChangeYourLifeNow />} />
      </Routes>
    </Router>
  );
}

export default App;
