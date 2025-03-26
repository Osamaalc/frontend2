import React, { useState } from 'react';
import { BookOpen, Edit, Calendar, Star } from 'lucide-react';
import './ProfileHeader.css';

const ProfileHeader = ({ name, image, role, university, memberSince }) => {
    // Default academic avatar
    const defaultAvatar = "/api/placeholder/256/256";
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = (e) => {
        // If the custom image fails to load, use the default image
        setImageLoading(false);
        e.target.onerror = null; // Prevent error loop
    };

    // Format member since date
    const formatMemberDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="luxury-profile-header">
            {/* Header background with decorative elements */}
            <div className="profile-header-bg">
                <div className="decorative-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>

            <div className="profile-header-content">
                <div className="profile-image-container">
                    <div className="profile-image-border">
                        <img
                            src={image || defaultAvatar}
                            alt={`${name || 'User'}'s profile`}
                            className={`profile-image ${imageLoading ? 'profile-image-loading' : ''}`}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    </div>
                    <button
                        className="edit-image-button"
                        aria-label="Change profile picture"
                    >
                        <Edit size={16} />
                    </button>
                </div>

                <div className="profile-info">
                    <div className="profile-name-wrapper">
                        <h1 className="profile-name">{name || 'New Student'}</h1>
                        <div className="profile-badges">
                            <span className="profile-badge role">{role || 'Student'}</span>
                            {university && <span className="profile-badge university">{university}</span>}
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <BookOpen size={18} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">3</span>
                                <span className="stat-label">Active Books</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <Calendar size={18} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">25</span>
                                <span className="stat-label">Days Active</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <Star size={18} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">Pro</span>
                                <span className="stat-label">Access Level</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-actions-row">
                        <button className="edit-profile-button">
                            <Edit size={16} className="edit-icon" />
                            <span>Edit Profile</span>
                        </button>
                        <div className="member-since">
                            <span className="member-label">Member since:</span>
                            <span className="member-date">{formatMemberDate(memberSince)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;