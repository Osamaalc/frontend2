import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = ({ isDarkMode }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`footer ${isDarkMode ? 'dark' : ''}`}>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <div className="logo-text">LOGO</div>
                        <p className="logo-description">Your trusted partner in excellence</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-section">
                            <h3 className="footer-title">Quick Links</h3>
                            <ul className="footer-menu">
                                <li className="footer-menu-item">
                                    <a href="/" className="footer-link">Home</a>
                                </li>
                                <li className="footer-menu-item">
                                    <a href="/about" className="footer-link">About Us</a>
                                </li>
                                <li className="footer-menu-item">
                                    <a href="/contact" className="footer-link">Contact</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3 className="footer-title">Contact Us</h3>
                            <ul className="footer-contact">
                                <li className="contact-item">
                                    <Mail className="contact-icon" />
                                    <span className="contact-text">info@example.com</span>
                                </li>
                                <li className="contact-item">
                                    <Phone className="contact-icon" />
                                    <span className="contact-text">+1 (123) 456-7890</span>
                                </li>
                                <li className="contact-item">
                                    <MapPin className="contact-icon" />
                                    <span className="contact-text">123 Street, City, Country</span>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3 className="footer-title">Follow Us</h3>
                            <div className="social-links">
                                <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                                    <Facebook className="social-icon" />
                                </a>
                                <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                                    <Twitter className="social-icon" />
                                </a>
                                <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                                    <Instagram className="social-icon" />
                                </a>
                                <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
                                    <Linkedin className="social-icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        &copy; {currentYear} Your Company. All rights reserved.
                    </div>
                    <div className="terms">
                        <a href="/privacy-policy" className="terms-link">Privacy Policy</a>
                        <span className="divider">|</span>
                        <a href="/terms-of-service" className="terms-link">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;