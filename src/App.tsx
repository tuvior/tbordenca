import { Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContextBase';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} flex min-h-screen flex-col`}>
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
