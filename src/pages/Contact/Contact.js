import React, { useState } from 'react';
import './Contact.css';

const Contact = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing in field
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.subject.trim()) {
            errors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Here you would normally send the form data to your backend
        console.log('Form submitted:', formData);

        // Show success message
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <main className={`contact-page ${isDarkMode ? 'dark' : ''}`}>
            {/* Hero Section - Enhanced */}
            <div className="contact-hero">
                <div className="hero-background animated-bg"></div>
                <div className="hero-gradient-overlay"></div>
                <div className="hero-particles"></div>
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
                <div className="hero-content-wrapper">
                    <div className="hero-content">
                        <div className="hero-title-container">
                            <h1 className="hero-title">Contact Us</h1>
                        </div>
                        <div className="hero-decoration">
                            <span className="hero-decoration-line"></span>
                            <span className="hero-decoration-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </span>
                            <span className="hero-decoration-line"></span>
                        </div>
                        <p className="hero-subtitle">We'd love to hear from you. Get in touch with our team.</p>
                        <div className="hero-badges">
                            <div className="hero-badge">
                                <span>Quick Response</span>
                            </div>
                            <div className="hero-badge">
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-bottom-wave"></div>
            </div>

            <div className="contact-container">
                {/* Contact Information - Improved */}
                <section className="contact-info-section">
                    <div className="section-header">
                        <h2 className="section-title">Get In Touch</h2>
                        <div className="section-divider"></div>
                        <p className="section-subtitle">Reach out to us through any of these channels</p>
                    </div>

                    <div className="info-grid">
                        <div className="info-card">
                            <div className="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <h3 className="info-title">Email Us</h3>
                            <p className="info-text">
                                Our friendly team is here to help:
                                <br />
                                <a href="mailto:support@example.com" className="info-link">support@example.com</a>
                            </p>
                            <div className="card-badge">24hr Response</div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <h3 className="info-title">Call Us</h3>
                            <p className="info-text">
                                Mon-Fri from 8am to 5pm
                                <br />
                                <a href="tel:+1234567890" className="info-link">+1 (234) 567-890</a>
                            </p>
                            <div className="card-badge">Live Support</div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                </svg>
                            </div>
                            <h3 className="info-title">Follow Us</h3>
                            <p className="info-text">
                                Stay connected on social media
                                <br />
                                <div className="social-links">
                                    <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                        </svg>
                                    </a>
                                    <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </a>
                                </div>
                            </p>
                            <div className="card-badge">Connect with Us</div>
                        </div>
                    </div>
                </section>

                {/* Contact Form Section - Improved */}
                <section className="contact-form-section">
                    <div className="form-bg-decoration"></div>
                    <div className="section-header">
                        <h2 className="section-title">Send us a Message</h2>
                        <div className="section-divider"></div>
                        <p className="section-subtitle">We'll get back to you as soon as possible</p>
                    </div>

                    <div className="form-container">
                        {isSubmitted ? (
                            <div className="success-message">
                                <div className="success-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <h3>Thank You!</h3>
                                <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                                <div className="checkmark-animation"></div>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={formErrors.name ? 'error' : ''}
                                    />
                                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={formErrors.email ? 'error' : ''}
                                    />
                                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="What is this regarding?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={formErrors.subject ? 'error' : ''}
                                    />
                                    {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us how we can help you"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={formErrors.message ? 'error' : ''}
                                    ></textarea>
                                    {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                                </div>

                                <button type="submit" className="submit-button">
                                    <span>Send Message</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                {/* FAQ Section - Improved */}
                <section className="faq-section">
                    <div className="section-header">
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <div className="section-divider"></div>
                        <p className="section-subtitle">Find quick answers to common questions</p>
                    </div>

                    <div className="faq-container">
                        <div className="faq-item">
                            <h3 className="faq-question">How do I request access to read books?</h3>
                            <p className="faq-answer">
                                Before accessing any books, you must submit an access request. Visit the "Request Access"
                                page and complete the form with your academic credentials and institution details.
                                Once your request is approved, you'll receive an email notification with your access credentials.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">How can I access educational materials from my university?</h3>
                            <p className="faq-answer">
                                After your access request is approved, you can browse our catalog of materials by selecting
                                your university from the dropdown menu. You'll have immediate access to all the resources
                                available to your institution.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">Are there any subscription fees for students?</h3>
                            <p className="faq-answer">
                                No, our platform is free for students whose universities have partnered with us. Your institution
                                covers the subscription costs, giving you unlimited access to all available resources after your
                                request is approved.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">Can I access materials from universities other than my own?</h3>
                            <p className="faq-answer">
                                Yes, our cross-institutional access program allows you to view and use selected resources from
                                our partner universities. Some specialized materials may have additional access requirements
                                or need separate request forms.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">How long does the access request approval process take?</h3>
                            <p className="faq-answer">
                                Typically, access requests are processed within 24-48 hours during business days. If your request
                                is urgent, please indicate so in your request form and we'll prioritize accordingly.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">How do I report an issue with a resource or the platform?</h3>
                            <p className="faq-answer">
                                You can report any issues through the "Report Issue" button available on each resource page,
                                or by contacting our support team directly through this contact form.
                            </p>
                        </div>
                    </div>
                </section>
            </div>


        </main>
    );
};

export default Contact;