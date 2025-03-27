import React from 'react';
import {
    Mail, Phone, MapPin, Calendar, User,
    Flag, Briefcase, Globe, Building
} from 'lucide-react';
import './PersonalInfo.css';

const PersonalInfo = ({ userData }) => {
    const formattedDate = (() => {
        if (!userData.birthDate) return '';
        const date = new Date(userData.birthDate);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    })();

    return (
        <div className="personal-info-container">
            <div className="personal-section-header">
                <h2>Personal Information</h2>
                <p className="section-description">Your basic personal and contact information</p>
            </div>

            <div className="personal-info-grid">
                <div className="info-card">
                    <div className="info-card-header">
                        <div className="info-icon user-icon">
                            <User size={20} />
                        </div>
                        <h3>Basic Information</h3>
                    </div>
                    <div className="info-card-content">
                        <div className="info-item">
                            <div className="info-label">Full Name</div>
                            <div className="info-value">{userData.name || '-'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Date of Birth</div>
                            <div className="info-value">
                                <div className="info-with-icon">
                                    <Calendar size={16} />
                                    <span>{formattedDate || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Occupation</div>
                            <div className="info-value">
                                <div className="info-with-icon">
                                    <Briefcase size={16} />
                                    <span>{userData.occupation || 'Student'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">University</div>
                            <div className="info-value">
                                <div className="info-with-icon">
                                    <Building size={16} />
                                    <span>{userData.university || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-card">
                    <div className="info-card-header">
                        <div className="info-icon contact-icon">
                            <Mail size={20} />
                        </div>
                        <h3>Contact Information</h3>
                    </div>
                    <div className="info-card-content">
                        <div className="info-item">
                            <div className="info-label">Email</div>
                            <div className="info-value">
                                <div className="info-with-icon">
                                    <Mail size={16} />
                                    <span>{userData.email || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Phone</div>
                            <div className="info-value">
                                <div className="info-with-icon">
                                    <Phone size={16} />
                                    <span>{userData.phone || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Address</div>
                            <div className="info-value">
                                <div className="info-with-icon">
                                    <MapPin size={16} />
                                    <span>{userData.address || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Website</div>
                            <div className="info-value">
                                <div className="info-with-icon">
                                    <Globe size={16} />
                                    <span>{userData.website || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-card wide-card">
                    <div className="info-card-header">
                        <div className="info-icon location-icon">
                            <Flag size={20} />
                        </div>
                        <h3>Additional Information</h3>
                    </div>
                    <div className="info-card-content">
                        <div className="info-item">
                            <div className="info-label">Bio</div>
                            <div className="info-value bio-text">
                                {userData.bio || 'No bio information provided.'}
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Interests</div>
                            <div className="info-value">
                                <div className="tags-container">
                                    {userData.interests?.length ? (
                                        userData.interests.map((interest, index) => (
                                            <span key={index} className="interest-tag">{interest}</span>
                                        ))
                                    ) : (
                                        <span className="no-data">No interests listed</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;