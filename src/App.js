import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact/Contact';
import About from "./pages/About";
import HomePage from './pages/Home/HomePage'; // Import the new HomePage component
import './styles/global.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);

        if (newDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    return (
        <BrowserRouter>
            <div className={`app ${darkMode ? 'dark' : ''}`}>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header isDarkMode={darkMode} toggleTheme={toggleDarkMode} />
                            <HomePage isDarkMode={darkMode} />
                            <Footer isDarkMode={darkMode} />
                        </>
                    } />

                    <Route path="/university/:universityId" element={
                        <>
                            <Header isDarkMode={darkMode} toggleTheme={toggleDarkMode} />
                            <HomePage isDarkMode={darkMode} />
                            <Footer isDarkMode={darkMode} />
                        </>
                    } />

                    <Route path="/profile" element={
                        <>
                            <Header isDarkMode={darkMode} toggleTheme={toggleDarkMode} />
                            <Profile isDarkMode={darkMode} toggleTheme={toggleDarkMode} />
                            <Footer isDarkMode={darkMode} />
                        </>
                    } />

                    <Route path="/about" element={
                        <>
                            <Header isDarkMode={darkMode} toggleTheme={toggleDarkMode} />
                            <About isDarkMode={darkMode} />
                            <Footer isDarkMode={darkMode} />
                        </>
                    } />

                    <Route path="/contact" element={
                        <>
                            <Header isDarkMode={darkMode} toggleTheme={toggleDarkMode} />
                            <Contact isDarkMode={darkMode} />
                            <Footer isDarkMode={darkMode} />
                        </>
                    } />

                    <Route path="*" element={
                        <>
                            <Header isDarkMode={darkMode} toggleTheme={toggleDarkMode} />
                            <main className="empty-content">
                                {/* Default/404 content */}
                                <div className="container" style={{textAlign: 'center', padding: '4rem 1rem'}}>
                                    <h1>Page Not Found</h1>
                                    <p>The page you are looking for doesn't exist or has been moved.</p>
                                </div>
                            </main>
                            <Footer isDarkMode={darkMode} />
                        </>
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;