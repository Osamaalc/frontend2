import React, { useEffect } from 'react';
import {
    Mail, Phone, MapPin, User,
    Globe, Briefcase, Shield,
    Copy, Check, ChevronRight
} from 'lucide-react';
import './PersonalInfo.css';

const PersonalInfo = ({ userData, isDarkMode }) => {
    // For copy to clipboard functionality
    const [copied, setCopied] = React.useState({
        email: false,
        phone: false
    });

    // Reset copy status after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (copied.email || copied.phone) {
                setCopied({
                    email: false,
                    phone: false
                });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [copied]);

    // Copy text to clipboard
    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied({
                ...copied,
                [field]: true
            });
        });
    };

    return (
        <div className={`enhanced-profile-container ${isDarkMode ? 'dark' : ''}`}>
            {/* Enhanced Final Card Design */}
            <div className="enhanced-final-card">
                <div className="card-inner">
                    <div className="enhanced-card-header">
                        <div className="enhanced-header-content">
                            <h3 className="enhanced-header-title">
                                Personal Information
                            </h3>
                            <p className="enhanced-header-subtitle">
                                Essential details for <span className="enhanced-name-highlight">{userData.name || 'John Doe'}</span>
                            </p>
                        </div>
                    </div>

                    <div className="enhanced-content">
                        {/* Full Name Field */}
                        <div className="enhanced-field">
                            <div className="enhanced-field-icon">
                                <User size={18} />
                            </div>
                            <div className="enhanced-field-content">
                                <label>Full Name</label>
                                <div className="enhanced-value-container">
                                    <p className="enhanced-field-value">{userData.name || 'John Doe'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Email Field with Copy Button */}
                        <div className="enhanced-field">
                            <div className="enhanced-field-icon">
                                <Mail size={18} />
                            </div>
                            <div className="enhanced-field-content">
                                <label>Email Address</label>
                                <div className="enhanced-value-container">
                                    <p className="enhanced-field-value">{userData.email || 'john.doe@example.com'}</p>
                                    <button
                                        className="enhanced-copy-button"
                                        onClick={() => copyToClipboard(userData.email || 'john.doe@example.com', 'email')}
                                        title="Copy to clipboard"
                                    >
                                        {copied.email ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Phone Field with Copy Button */}
                        <div className="enhanced-field">
                            <div className="enhanced-field-icon">
                                <Phone size={18} />
                            </div>
                            <div className="enhanced-field-content">
                                <label>Phone Number</label>
                                <div className="enhanced-value-container">
                                    <p className="enhanced-field-value">{userData.phone || '+1 (123) 456-7890'}</p>
                                    <button
                                        className="enhanced-copy-button"
                                        onClick={() => copyToClipboard(userData.phone || '+1 (123) 456-7890', 'phone')}
                                        title="Copy to clipboard"
                                    >
                                        {copied.phone ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="enhanced-field">
                            <div className="enhanced-field-icon">
                                <MapPin size={18} />
                            </div>
                            <div className="enhanced-field-content">
                                <label>Address</label>
                                <div className="enhanced-value-container">
                                    <p className="enhanced-field-value">{userData.address || '123 Main St, New York, NY 10001'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Website Field */}
                        {userData.website && (
                            <div className="enhanced-field">
                                <div className="enhanced-field-icon">
                                    <Globe size={18} />
                                </div>
                                <div className="enhanced-field-content">
                                    <label>Website</label>
                                    <div className="enhanced-value-container">
                                        <a href={userData.website} className="enhanced-website-link" target="_blank" rel="noopener noreferrer">
                                            {userData.website}
                                            <ChevronRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Occupation Field */}
                        <div className="enhanced-field">
                            <div className="enhanced-field-icon">
                                <Briefcase size={18} />
                            </div>
                            <div className="enhanced-field-content">
                                <label>Occupation</label>
                                <div className="enhanced-value-container">
                                    <p className="enhanced-field-value">{userData.occupation || 'Computer Science Student'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className="enhanced-card-footer">
                        <div className="enhanced-security-note">
                            <Shield size={14} />
                            <span>Your information is securely protected</span>
                        </div>
                        <div className="enhanced-last-updated">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PersonalInfo;