import React, { useState, useEffect } from 'react';
import {
    User, BookOpen, History, Settings,
} from 'lucide-react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import PersonalInfo from '../../components/profile/PersonalInfo';
import AccountSettings from '../../components/profile/AccountSettings';
import BookshelfSection from '../../components/profile/BookshelfSection';
import RequestHistory from '../../components/profile/RequestHistory';
import './Profile.css';

const Profile = ({ isDarkMode }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const [isLoading, setIsLoading] = useState(true);

    // Enhanced user data with more information
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (123) 456-7890',
        address: '123 Main St, New York, NY 10001',
        birthDate: '1990-01-01',
        occupation: 'Computer Science Student',
        website: 'johndoe.portfolio.dev',
        bio: 'Passionate computer science student with a keen interest in artificial intelligence and machine learning. Currently working on several projects to enhance my skills in these areas.',
        interests: ['Artificial Intelligence', 'Web Development', 'Data Science', 'Mobile Apps'],
        university: 'Harvard University',
        profileImage: '/api/placeholder/256/256',
        role: 'Student',
        memberSince: '2022-03-15',
        bookshelf: [
            { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', lastAccessed: '2023-03-10', progress: 65 },
            { id: 2, title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', lastAccessed: '2023-03-15', progress: 30 },
            { id: 3, title: 'Database Systems: The Complete Book', author: 'Hector Garcia-Molina', lastAccessed: '2023-02-28', progress: 100 },
            { id: 4, title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', lastAccessed: '2023-03-01', progress: 45 },
            { id: 5, title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Erich Gamma', lastAccessed: '2023-02-15', progress: 80 },
        ],
        requestHistory: [
            { id: 'REQ-2023-001', bookTitle: 'Machine Learning: A Probabilistic Perspective', requestDate: '2023-03-01', status: 'Approved', approvalDate: '2023-03-02' },
            { id: 'REQ-2023-002', bookTitle: 'Computer Networking: A Top-Down Approach', requestDate: '2023-03-05', status: 'Pending' },
            { id: 'REQ-2023-003', bookTitle: 'Operating System Concepts', requestDate: '2023-02-20', status: 'Approved', approvalDate: '2023-02-21' },
            { id: 'REQ-2023-004', bookTitle: 'Compilers: Principles, Techniques, and Tools', requestDate: '2023-01-15', status: 'Rejected', approvalDate: '2023-01-17' },
        ]
    };

    // Define available tabs with icons (removed academic tab)
    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: <User className="tab-icon" /> },
        { id: 'bookshelf', label: 'My Bookshelf', icon: <BookOpen className="tab-icon" /> },
        { id: 'requests', label: 'Request History', icon: <History className="tab-icon" /> },
        { id: 'settings', label: 'Account Settings', icon: <Settings className="tab-icon" /> }
    ];

    // Simulate loading data from an API
    useEffect(() => {
        // Simulate network request
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Handle tab change with URL hash
    useEffect(() => {
        // Get current tab from URL hash if present
        const hash = window.location.hash.replace('#', '');
        const validTabs = tabs.map(tab => tab.id);

        if (hash && validTabs.includes(hash)) {
            setActiveTab(hash);
        }

        // Update URL when tab changes
        const handleTabChange = () => {
            const currentTab = window.location.hash.replace('#', '');
            if (currentTab && validTabs.includes(currentTab)) {
                setActiveTab(currentTab);
            }
        };

        window.addEventListener('hashchange', handleTabChange);
        return () => window.removeEventListener('hashchange', handleTabChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update URL hash when tab changes
    const changeTab = (tabId) => {
        window.location.hash = tabId;
        setActiveTab(tabId);
    };

    return (
        <main className={`profile-page ${isDarkMode ? 'dark' : ''}`}>
            <div className="profile-container">
                <ProfileHeader
                    name={userData.name}
                    image={userData.profileImage}
                    role={userData.role}
                    university={userData.university}
                    memberSince={userData.memberSince}
                />

                <div className="profile-content">
                    {/* Profile Navigation Tabs */}
                    <div className="profile-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={activeTab === tab.id ? 'active' : ''}
                                onClick={() => changeTab(tab.id)}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {isLoading ? (
                            <div className="profile-loading">
                                <div className="loading-spinner"></div>
                            </div>
                        ) : (
                            <>
                                {activeTab === 'personal' && (
                                    <PersonalInfo userData={userData} />
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;