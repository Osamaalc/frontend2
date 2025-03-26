import React from 'react';
import './About.css';

const About = ({ isDarkMode }) => {
    return (
        <main className={`about-page ${isDarkMode ? 'dark' : ''}`}>
            {/* Hero Section with Improved Design */}
            <div className="hero-section">
                <div className="hero-background"></div>
                <div className="hero-gradient-overlay"></div>
                <div className="hero-particles"></div>
                <div className="hero-content-wrapper">
                    <div className="hero-content">
                        <div className="hero-title-container">
                            <h1 className="hero-title">About Us</h1>
                        </div>
                        <div className="hero-decoration">
                            <span className="hero-decoration-line"></span>
                            <span className="hero-decoration-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </span>
                            <span className="hero-decoration-line"></span>
                        </div>
                        <p className="hero-subtitle">Connecting students with premium educational resources</p>
                        <div className="hero-badge">
                            <span>Est. 2025</span>
                        </div>
                    </div>
                </div>
                <div className="hero-bottom-wave"></div>
            </div>

            <div className="about-container">
                <section className="mission-section">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <div className="card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </div>
                            <h2 className="card-title">Our Mission</h2>
                            <p className="card-text">To transform educational access by connecting students with premium academic resources across universities worldwide.</p>
                        </div>

                        <div className="mission-card">
                            <div className="card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <h2 className="card-title">Our Vision</h2>
                            <p className="card-text">To become the premier digital platform for academic resources, breaking down barriers to knowledge and fostering a global community of learners.</p>
                        </div>

                        <div className="mission-card">
                            <div className="card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                                </svg>
                            </div>
                            <h2 className="card-title">Our Purpose</h2>
                            <p className="card-text">To empower students with the resources they need to excel in their academic journey and beyond, making quality education accessible to all.</p>
                        </div>
                    </div>
                </section>

                <section className="story-section">
                    <div className="section-header">
                        <h2 className="section-title">Our Story</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="story-content">
                        <div className="story-image">
                            <div className="image-frame">
                                <img src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=80" alt="Educational resources" />
                            </div>
                        </div>

                        <div className="story-text">
                            <p>
                                Founded in 2025, our platform was born from a simple yet profound vision: to revolutionize how students access academic textbooks and educational resources across universities worldwide.
                            </p>

                            <p>
                                What began as an innovative concept at a university hackathon has evolved into a comprehensive platform serving thousands of students. As former students ourselves, we experienced firsthand the challenges of finding affordable and accessible textbooks. The frustration of navigating fragmented systems and the financial burden of acquiring necessary materials inspired us to create a solution.
                            </p>

                            <p>
                                Our platform bridges this gap by offering a centralized hub where students can discover, access, and utilize educational materials from multiple prestigious universities. We've partnered with leading institutions to ensure that our offerings maintain the highest standards of academic excellence.
                            </p>

                            <p>
                                Through continuous innovation and a student-centered approach, we've expanded our services to include customized recommendations, seamless integration with university systems, and tools that enhance the learning experience. Our commitment to accessibility, quality, and innovation drives everything we do.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="values-section">
                    <div className="section-header">
                        <h2 className="section-title">Our Core Values</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                            </div>
                            <h3 className="value-title">Global Access</h3>
                            <p className="value-text">
                                We believe educational resources should transcend geographical boundaries, providing students worldwide with access to quality materials.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z"></path>
                                </svg>
                            </div>
                            <h3 className="value-title">Academic Excellence</h3>
                            <p className="value-text">
                                We uphold the highest standards of academic integrity and excellence in all the educational resources we provide.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                </svg>
                            </div>
                            <h3 className="value-title">Innovation</h3>
                            <p className="value-text">
                                We continuously seek innovative solutions to enhance the accessibility and usability of educational resources.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <h3 className="value-title">Student-Centered</h3>
                            <p className="value-text">
                                We put students at the heart of everything we do, designing our platform to meet their unique needs and enhance their learning journey.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <div className="section-header">
                        <h2 className="section-title">Premium Features</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="features-list">
                        <div className="feature-item">
                            <div className="feature-number">01</div>
                            <div className="feature-content">
                                <h3 className="feature-title">Extensive Library</h3>
                                <p className="feature-description">
                                    Access thousands of textbooks and educational resources from leading universities around the world.
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-number">02</div>
                            <div className="feature-content">
                                <h3 className="feature-title">Personalized Recommendations</h3>
                                <p className="feature-description">
                                    Our intelligent system suggests relevant materials based on your academic interests and course history.
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-number">03</div>
                            <div className="feature-content">
                                <h3 className="feature-title">Advanced Search Tools</h3>
                                <p className="feature-description">
                                    Find exactly what you need with our powerful search functionality, filtering by subject, university, format, and more.
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-number">04</div>
                            <div className="feature-content">
                                <h3 className="feature-title">Seamless Integration</h3>
                                <p className="feature-description">
                                    Our platform integrates with university systems to provide a cohesive learning experience with minimal friction.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="cta-section">
                <div className="cta-overlay"></div>
                <div className="cta-content">
                    <h2 className="cta-title">Ready to enhance your learning experience?</h2>
                    <p className="cta-text">Join thousands of students who have transformed their academic journey with our platform.</p>
                    <button className="cta-button">Get Started Today</button>
                </div>
            </div>
        </main>
    );
};

export default About;