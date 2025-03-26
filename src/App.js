import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact/Contact';
import './styles/global.css';
import About from "./pages/About";

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
                                {/* المحتوى الافتراضي الفارغ */}
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