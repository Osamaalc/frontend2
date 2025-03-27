import React from 'react';
import {
    GraduationCap, BookOpen, School, Award,
    Calendar, Hash, FileText, Download, Shield
} from 'lucide-react';
import './AcademicInfo.css';

const AcademicInfo = ({ academicData }) => {
    return (
        <div className="academic-info-container">
            <div className="academic-cards">
                <div className="academic-card">
                    <div className="card-header">
                        <div className="card-icon">
                            <School size={20} />
                        </div>
                        <h3 className="card-title">University Information</h3>
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
                            <span className={`status-badge ${academicData.academicStatus.toLowerCase()}`}>
                                {academicData.academicStatus}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="academic-card">
                    <div className="card-header">
                        <div className="card-icon">
                            <Award size={20} />
                        </div>
                        <h3 className="card-title">Achievements</h3>
                    </div>
                    <div className="card-content">
                        <div className="info-item">
                            <span className="info-label">GPA:</span>
                            <span className="info-value">3.85/4.0</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Honors:</span>
                            <span className="info-value">Dean's List (2021, 2022)</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Scholarships:</span>
                            <span className="info-value">Academic Excellence Scholarship</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Certifications:</span>
                            <span className="info-value">Data Science Foundations</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-header">
                <div className="section-title">
                    <BookOpen className="section-title-icon" />
                    <span>Course Enrollments</span>
                </div>
            </div>

            <div className="courses-container">
                {academicData.courseEnrollments.length > 0 ? (
                    <table className="courses-table">
                        <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Year</th>
                            <th>Resources</th>
                        </tr>
                        </thead>
                        <tbody>
                        {academicData.courseEnrollments.map((course, index) => (
                            <tr key={index}>
                                <td><code>{course.id}</code></td>
                                <td>{course.name}</td>
                                <td>{course.year}</td>
                                <td>
                                    <button className="resource-button">
                                        <FileText size={14} />
                                        <span>Access Materials</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <GraduationCap size={48} className="empty-icon" />
                        <h3>No Course Enrollments</h3>
                        <p>You are not currently enrolled in any courses.</p>
                        <button className="add-button">
                            <span>Add Course Enrollment</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="verification-section">
                <div className="verification-info">
                    <div className="verification-icon">
                        <Shield size={22} />
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