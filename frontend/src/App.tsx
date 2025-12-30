import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';

// Existing Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';       
import Register from './pages/Register/Register'; 
import Apropos from './pages/Apropos/Apropos';
import MyLearning from './pages/MyLearning/MyLearning';     
import CoursePlayer from './pages/CoursePlayer/CoursePlayer'; // Video Player
import MonitorDashboard from './pages/MonitorDashboard/MonitorDashboard';
import Contact from './pages/Contact/Contact';

// NEW Quiz Pages
import QuizList from './pages/Quiz/QuizList';     // The list of available tests
import QuizPlayer from './pages/Quiz/QuizPlayer'; // The actual test interface

function App() {
  // Initialize state from localStorage to persist login across refreshes
  const [user, setUser] = useState<string | null>(localStorage.getItem("user") || null);
  const [role, setRole] = useState<string | null>(localStorage.getItem("role") || null);

  const location = useLocation();

  // Logic to hide the Header/Navbar on immersive pages:
  // 1. '/learn/...' -> Video Course Player
  // 2. '/quiz/...' -> Quiz Player (but not the '/quiz' list page)
  const isPlayerPage = 
    location.pathname.startsWith('/learn/') || 
    (location.pathname.startsWith('/quiz/') && location.pathname !== '/quiz');

  return (
    <div className="app-root">
      {/* Conditionally render Header */}
      {!isPlayerPage && (
        <Header user={user} setUser={setUser} role={role} setRole={setRole} />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Public Routes */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apropos" element={<Apropos />} />
          {/* === AJOUT ICI : La route pour la page Contact === */}
          <Route path="/contact" element={<Contact />} />


          {/* Student Routes */}
          <Route path="/my-courses" element={<MyLearning />} />
          
          {/* Video Course Player (Fetched from Backend) */}
          <Route path="/learn/:id" element={<CoursePlayer />} />

          {/* Quiz Routes (Static Data) */}
          <Route path="/quiz" element={<QuizList />} />        {/* List of tests */}
          <Route path="/quiz/:id" element={<QuizPlayer />} />  {/* Taking a test */}

          {/* Instructor/Monitor Route */}
          <Route path="/dashboard" element={<MonitorDashboard />} />

        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;