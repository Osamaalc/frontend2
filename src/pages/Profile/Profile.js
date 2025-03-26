import React, { useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import PersonalInfo from '../../components/profile/PersonalInfo';
import AccountSettings from '../../components/profile/AccountSettings';
import AcademicInfo from '../../components/profile/AcademicInfo';
import BookshelfSection from '../../components/profile/BookshelfSection';
import RequestHistory from '../../components/profile/RequestHistory';
import './Profile.css';

const Profile = ({ isDarkMode }) => {
    const [activeTab, setActiveTab] = useState('personal');

    // Sample user data - in a real app, this would come from an API/backend
    const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1 (123) 456-7890',
        address: '123 Main St, New York, NY 10001',
        birthDate: '1990-01-01',
        profileImage: 'https://randomuser.me/api/portraits/men/44.jpg',
        role: 'Student',
        memberSince: '2022-03-15',
        academicInfo: {
            university: 'Harvard University',
            faculty: 'Computer Science',
            studentId: 'HRV-2022-CS-1234',
            yearOfStudy: '3rd Year',
            academicStatus: 'Active',
            courseEnrollments: [
                { id: 'CS101', name: 'Introduction to Computer Science', year: '2023' },
                { id: 'CS202', name: 'Data Structures and Algorithms', year: '2023' },
                { id: 'MATH303', name: 'Linear Algebra', year: '2023' }
            ]
        },
        bookshelf: [
            { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', lastAccessed: '2023-03-10', progress: 65 },
            { id: 2, title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', lastAccessed: '2023-03-15', progress: 30 },
            { id: 3, title: 'Database Systems: The Complete Book', author: 'Hector Garcia-Molina', lastAccessed: '2023-02-28', progress: 100 },
        ],
        requestHistory: [
            { id: 'REQ-2023-001', bookTitle: 'Machine Learning: A Probabilistic Perspective', requestDate: '2023-03-01', status: 'Approved', approvalDate: '2023-03-02' },
            { id: 'REQ-2023-002', bookTitle: 'Computer Networking: A Top-Down Approach', requestDate: '2023-03-05', status: 'Pending' },
            { id: 'REQ-2023-003', bookTitle: 'Operating System Concepts', requestDate: '2023-02-20', status: 'Approved', approvalDate: '2023-02-21' }
        ]
    };

    // Define available tabs
    const tabs = [
        { id: 'personal', label: 'Personal Information' },
        { id: 'academic', label: 'Academic Information' },
        { id: 'bookshelf', label: 'My Bookshelf' },
        { id: 'requests', label: 'Request History' },
        { id: 'settings', label: 'Account Settings' }
    ];

    return (
        <main className={`profile-page ${isDarkMode ? 'dark' : ''}`}>
            <div className="profile-container">
                <ProfileHeader
                    name={userData.name}
                    image={userData.profileImage}
                    role={userData.role}
                    university={userData.academicInfo.university}
                    memberSince={userData.memberSince}
                />

                <div className="profile-content">
                    {/* Profile Navigation Tabs */}
                    <div className="profile-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={activeTab === tab.id ? 'active' : ''}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {activeTab === 'personal' && (
                            <PersonalInfo userData={userData} />
                        )}

                        {activeTab === 'academic' && (
                            <AcademicInfo academicData={userData.academicInfo} />
                        )}

                        {activeTab === 'bookshelf' && (
                            <BookshelfSection bookshelfData={userData.bookshelf} />
                        )}

                        {activeTab === 'requests' && (
                            <RequestHistory requestData={userData.requestHistory} />
                        )}

                        {activeTab === 'settings' && (
                            <AccountSettings />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;