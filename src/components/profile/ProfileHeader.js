import React, { useState } from 'react';
import { BookOpen, Edit } from 'lucide-react';
import './ProfileHeader.css';

const ProfileHeader = ({ name, image }) => {
    // Default academic avatar for university books website
    const defaultAvatar = "/api/placeholder/256/256";

    // You can replace the above line with a path to a real local image like:
    // const defaultAvatar = "/images/academic-avatar.png";

    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = (e) => {
        // If the custom image fails to load, use the default image
        setImageLoading(false);
        e.target.onerror = null; // Prevent error loop
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
                        <BookOpen size={16} />
                    </button>
                </div>

                <div className="profile-info">
                    <div className="profile-name-wrapper">
                        <h1 className="profile-name">{name || 'New Student'}</h1>
                    </div>

                    <div className="profile-actions-row">
                        <button className="edit-profile-button">
                            <Edit size={16} className="edit-icon" />
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;