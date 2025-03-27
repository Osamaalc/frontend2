import React from 'react';
import {
    BookOpen, Calendar, Building,
    CheckCircle, UserCircle, Award, Activity
} from 'lucide-react';
import './ProfileHeader.css';

const ProfileHeader = ({ name, role, university, memberSince }) => {
    // Format member since date
    const formatMemberDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const memberSinceFormatted = formatMemberDate(memberSince);

    return (
        <div className="profile-header">
            <div className="profile-cover">
                {/* Enhanced Background Elements */}
                <div className="cover-gradient"></div>
                <div className="cover-pattern"></div>

                {/* Animated Shapes */}
                <div className="animated-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                    <div className="shape shape-5"></div>
                    <div className="shape shape-6"></div>
                </div>

                {/* Light effects */}
                <div className="light-beam light-beam-1"></div>
                <div className="light-beam light-beam-2"></div>
                <div className="light-beam light-beam-3"></div>

                {/* Wave animation at bottom */}
                <div className="cover-wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,197.3C672,213,768,235,864,229.3C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            <div className="profile-main">
                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar">
                        <div className="avatar-ring"></div>
                        <div className="avatar-icon">
                            <UserCircle size={64} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                <div className="profile-info-wrapper">
                    <div className="profile-basic-info">
                        <h1 className="profile-name">{name || 'New User'}</h1>

                        <div className="profile-badges">
                            {role && (
                                <div className="profile-badge role">
                                    <UserCircle size={14} />
                                    <span>{role}</span>
                                </div>
                            )}
                            {university && (
                                <div className="profile-badge university">
                                    <Building size={14} />
                                    <span>{university}</span>
                                </div>
                            )}
                            <div className="profile-badge verified">
                                <CheckCircle size={14} />
                                <span>Verified</span>
                            </div>
                        </div>

                        <div className="profile-joined">
                            <Calendar size={14} />
                            <span>Member since {memberSinceFormatted}</span>
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <BookOpen size={16} />
                            </div>
                            <div className="stat-value">5</div>
                            <div className="stat-label">Books</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <Activity size={16} />
                            </div>
                            <div className="stat-value">28</div>
                            <div className="stat-label">Days Active</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <Award size={16} />
                            </div>
                            <div className="stat-value">PRO</div>
                            <div className="stat-label">Status</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;