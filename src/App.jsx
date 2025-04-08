import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Mentorship from './components/Mentorship';
import PDFBooks from './components/PDFBooks';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>RejoCommunity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <Navbar />
      <Hero />
      <Courses />
      <Mentorship />
      <PDFBooks />
      <Footer />
    </div>
  );
}

export default App;
