import React from 'react';
import './AcademicInfo.css';

const AcademicInfo = ({ academicData }) => {
    return (
        <div className="academic-info-container">
            <div className="section-header">
                <h2>Academic Information</h2>
                <p className="section-description">Your educational details and course enrollment information</p>
            </div>

            <div className="academic-main-info">
                <div className="info-card">
                    <div className="card-header">
                        <div className="card-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                            </svg>
                        </div>
                        <h3>University Information</h3>
                    </div>
                    <div className="card-content">
                        <div className="info-item">
                            <span className="info-label">University:</span>
                            <span className="info-value">{academicData.university}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Faculty:</span>
                            <span className="info-value">{academicData.faculty}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Student ID:</span>
                            <span className="info-value">{academicData.studentId}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Year of Study:</span>
                            <span className="info-value">{academicData.yearOfStudy}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Academic Status:</span>
                            <span className={`info-value status-badge ${academicData.academicStatus.toLowerCase()}`}>
                                {academicData.academicStatus}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="course-enrollment-section">
                <h3>Current Course Enrollments</h3>
                <div className="course-list">
                    {academicData.courseEnrollments.length > 0 ? (
                        <div className="course-grid">
                            <div className="course-header">
                                <div className="course-id">Course ID</div>
                                <div className="course-name">Course Name</div>
                                <div className="course-year">Year</div>
                                <div className="course-actions">Resources</div>
                            </div>
                            {academicData.courseEnrollments.map((course, index) => (
                                <div key={index} className="course-row">
                                    <div className="course-id">{course.id}</div>
                                    <div className="course-name">{course.name}</div>
                                    <div className="course-year">{course.year}</div>
                                    <div className="course-actions">
                                        <button className="resource-button">
                                            Access Books
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>You are not currently enrolled in any courses.</p>
                            <button className="add-course-button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                                Add Course Enrollment
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="verification-section">
                <div className="verification-info">
                    <div className="verification-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <div className="verification-text">
                        <h4>Academic Verification Status</h4>
                        <p>Your academic information has been verified. You have full access to all educational resources for your courses.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicInfo;