import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
    });

    const [language, setLanguage] = useState('en');

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        // Here you would send the password change to your API
        console.log('Password change submitted:', passwordForm);

        // Reset form
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const saveNotificationSettings = () => {
        // Here you would send the notification settings to your API
        console.log('Notification settings saved:', notifications);
    };

    const saveLanguageSettings = () => {
        // Here you would send the language settings to your API
        console.log('Language set to:', language);
    };

    return (
        <div className="account-settings-container">
            {/* Password Change Section */}
            <section className="settings-section">
                <div className="section-header">
                    <h2>Change Password</h2>
                </div>

                <form onSubmit={handlePasswordSubmit} className="password-form">
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            required
                            minLength="8"
                        />
                        <small>Password must be at least 8 characters long</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                            minLength="8"
                        />
                    </div>

                    <button type="submit" className="save-button">Change Password</button>
                </form>
            </section>

            {/* Notification Preferences Section */}
            <section className="settings-section">
                <div className="section-header">
                    <h2>Notification Preferences</h2>
                </div>

                <div className="notification-options">
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="emailNotifications"
                            name="emailNotifications"
                            checked={notifications.emailNotifications}
                            onChange={handleNotificationChange}
                        />
                        <label htmlFor="emailNotifications">Email Notifications</label>
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="smsNotifications"
                            name="smsNotifications"
                            checked={notifications.smsNotifications}
                            onChange={handleNotificationChange}
                        />
                        <label htmlFor="smsNotifications">SMS Notifications</label>
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="marketingEmails"
                            name="marketingEmails"
                            checked={notifications.marketingEmails}
                            onChange={handleNotificationChange}
                        />
                        <label htmlFor="marketingEmails">Marketing Emails</label>
                    </div>

                    <button
                        type="button"
                        className="save-button"
                        onClick={saveNotificationSettings}
                    >
                        Save Notification Settings
                    </button>
                </div>
            </section>

            {/* Language Preferences Section */}
            <section className="settings-section">
                <div className="section-header">
                    <h2>Language Preferences</h2>
                </div>

                <div className="language-options">
                    <div className="form-group">
                        <label htmlFor="language">Select Language</label>
                        <select
                            id="language"
                            name="language"
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="ar">Arabic</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        className="save-button"
                        onClick={saveLanguageSettings}
                    >
                        Save Language Settings
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AccountSettings;