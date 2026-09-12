import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Courses from "./components/Courses.jsx";
import CourseDetailModal from "./components/CourseDetailModal.jsx";
import Results from "./components/Results.jsx";
import Teachers from "./components/Teachers.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import SuccessModal from "./components/SuccessModal.jsx";
import Branches from "./components/Branches.jsx";
import WhyUs from "./components/WhyUs.jsx";
import Process from "./components/Process.jsx";
import FAQ from "./components/FAQ.jsx";
import BottomCTA from "./components/BottomCTA.jsx";
import Footer from "./components/Footer.jsx";
import { COURSES } from "./data/courses.js";
import { scrollToId } from "./utils/scroll.js";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [prefill, setPrefill] = useState(null);

  const goRegister = (courseTitle) => {
    setPrefill({ course: courseTitle || COURSES[0].title });
    scrollToId("aloqa");
  };

  return (
    <div className="font-sans text-slate-900 bg-white">
      <Navbar onRegisterClick={() => scrollToId("aloqa")} />
      <Hero onRegisterClick={() => scrollToId("aloqa")} />
      <Stats />
      <Courses onOpenCourse={setSelectedCourse} />
      <Results />
      <Teachers />
      <RegistrationForm prefill={prefill} onSuccess={() => setShowSuccess(true)} />
      <Branches />
      <WhyUs />
      <Process />
      <FAQ />
      <BottomCTA onRegisterClick={() => scrollToId("aloqa")} />
      <Footer />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onRegister={(title) => goRegister(title)}
      />
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
