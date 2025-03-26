import React, { useState } from 'react';
import './PersonalInfo.css';

const PersonalInfo = ({ userData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        birthDate: userData.birthDate || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you could add an API request to update user data
        console.log('Updated data:', formData);
        setIsEditing(false);
    };

    return (
        <div className="personal-info-container">
            <div className="section-header">
                <h2>Personal Information</h2>
                {!isEditing && (
                    <button
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="info-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthDate">Date of Birth</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-button">Save Changes</button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="info-display">
                    <div className="info-item">
                        <span className="info-label">Full Name:</span>
                        <span className="info-value">{userData.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{userData.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Phone Number:</span>
                        <span className="info-value">{userData.phone}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Address:</span>
                        <span className="info-value">{userData.address}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Date of Birth:</span>
                        <span className="info-value">
              {userData.birthDate ? new Date(userData.birthDate).toLocaleDateString('en-US') : ''}
            </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalInfo;