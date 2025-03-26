import React, { useState } from 'react';
import './RequestHistory.css';

const RequestHistory = ({ requestData }) => {
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'approved', 'rejected'

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Filter requests based on selected status
    const filteredRequests = requestData.filter(request =>
        filterStatus === 'all' || request.status.toLowerCase() === filterStatus.toLowerCase()
    );

    // Get status badge class
    const getStatusBadgeClass = (status) => {
        switch(status.toLowerCase()) {
            case 'approved':
                return 'status-badge approved';
            case 'pending':
                return 'status-badge pending';
            case 'rejected':
                return 'status-badge rejected';
            default:
                return 'status-badge';
        }
    };

    return (
        <div className="request-history-container">
            <div className="section-header">
                <h2>Access Request History</h2>
                <p className="section-description">Track status of your access requests for educational materials</p>
            </div>

            <div className="request-filters">
                <div className="filter-buttons">
                    <button
                        className={`filter-button ${filterStatus === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        All Requests
                    </button>
                    <button
                        className={`filter-button ${filterStatus === 'pending' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`filter-button ${filterStatus === 'approved' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('approved')}
                    >
                        Approved
                    </button>
                    <button
                        className={`filter-button ${filterStatus === 'rejected' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('rejected')}
                    >
                        Rejected
                    </button>
                </div>

                <button className="new-request-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    New Request
                </button>
            </div>

            <div className="requests-container">
                {filteredRequests.length > 0 ? (
                    <div className="requests-table">
                        <div className="request-header">
                            <div className="request-cell id-cell">Request ID</div>
                            <div className="request-cell book-cell">Book Title</div>
                            <div className="request-cell date-cell">Request Date</div>
                            <div className="request-cell approval-cell">Approval Date</div>
                            <div className="request-cell status-cell">Status</div>
                            <div className="request-cell actions-cell">Actions</div>
                        </div>
                        {filteredRequests.map(request => (
                            <div key={request.id} className="request-row">
                                <div className="request-cell id-cell">{request.id}</div>
                                <div className="request-cell book-cell">{request.bookTitle}</div>
                                <div className="request-cell date-cell">{formatDate(request.requestDate)}</div>
                                <div className="request-cell approval-cell">{formatDate(request.approvalDate)}</div>
                                <div className="request-cell status-cell">
                                    <span className={getStatusBadgeClass(request.status)}>
                                        {request.status}
                                    </span>
                                </div>
                                <div className="request-cell actions-cell">
                                    {request.status.toLowerCase() === 'approved' ? (
                                        <button className="action-button access-button">
                                            Access Book
                                        </button>
                                    ) : request.status.toLowerCase() === 'pending' ? (
                                        <button className="action-button cancel-button">
                                            Cancel Request
                                        </button>
                                    ) : (
                                        <button className="action-button retry-button">
                                            Retry Request
                                        </button>
                                    )}
                                    <button className="action-button details-button">
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-requests">
                        <div className="empty-illustration">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <h3>No requests found</h3>
                        <p>You don't have any {filterStatus !== 'all' ? filterStatus : ''} access requests yet.</p>
                        <button className="start-request-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                            Start a New Request
                        </button>
                    </div>
                )}
            </div>

            <div className="request-info-section">
                <div className="info-card">
                    <div className="info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    </div>
                    <h3>About Access Requests</h3>
                    <p>Access requests are processed within 24-48 hours during business days. Once approved, you'll gain immediate access to the requested educational materials. For urgent requests, please contact the library support team.</p>
                </div>
            </div>
        </div>
    );
};

export default RequestHistory;