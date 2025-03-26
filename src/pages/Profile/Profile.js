import React, { useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import PersonalInfo from '../../components/profile/PersonalInfo';
import AccountSettings from '../../components/profile/AccountSettings';
import './Profile.css';

const Profile = ({ isDarkMode }) => {
    const [activeTab, setActiveTab] = useState('personal');

    // هذه البيانات يمكن أن تأتي من API
    const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1 (123) 456-7890',
        address: '123 Main St, New York, NY 10001',
        birthDate: '1990-01-01',
        profileImage: '/default-avatar.png',
    };

    return (
        <main className={`profile-page ${isDarkMode ? 'dark' : ''}`}>
            <div className="profile-container">
                <ProfileHeader
                    name={userData.name}
                    image={userData.profileImage}
                />

                <div className="profile-content">
                    {/* شريط التبويب */}
                    <div className="profile-tabs">
                        <button
                            className={activeTab === 'personal' ? 'active' : ''}
                            onClick={() => setActiveTab('personal')}
                        >
                            Personal Information
                        </button>
                        <button
                            className={activeTab === 'settings' ? 'active' : ''}
                            onClick={() => setActiveTab('settings')}
                        >
                            Account Settings
                        </button>
                    </div>

                    {/* محتوى التبويب النشط */}
                    <div className="tab-content">
                        {activeTab === 'personal' && (
                            <PersonalInfo userData={userData} />
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