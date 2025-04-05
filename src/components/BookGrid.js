import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Clock, Calendar, Tag, Award, Star, BookMarked } from 'lucide-react';
import './BookGrid.css';

const BookAccessStatus = {
    NOT_REQUESTED: 'NOT_REQUESTED',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
};

const EnhancedBookGrid = ({ books, loading, error, isDarkMode, onRequestAccess }) => {
    // State to track book access requests
    const [accessRequests, setAccessRequests] = useState({});

    if (loading) {
        return (
            <div className={`books-loading ${isDarkMode ? 'dark' : ''}`}>
                <div className="loading-spinner"></div>
                <p>Loading books...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`books-error ${isDarkMode ? 'dark' : ''}`}>
                <p>{error}</p>
                <button className="retry-button">Retry</button>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className={`books-empty ${isDarkMode ? 'dark' : ''}`}>
                <BookOpen size={48} />
                <h3>No books found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        );
    }

    const handleRequestAccess = (bookId) => {
        // Update local state
        setAccessRequests({
            ...accessRequests,
            [bookId]: BookAccessStatus.PENDING
        });

        // Call the parent component handler if provided
        if (onRequestAccess) {
            onRequestAccess(bookId);
        }
    };

    const getAccessStatusUI = (book) => {
        const status = accessRequests[book.id] || book.accessStatus || BookAccessStatus.NOT_REQUESTED;

        switch (status) {
            case BookAccessStatus.APPROVED:
                return (
                    <Link to={`/read/${book.id}`} className="book-action-button approved">
                        <BookMarked size={16} />
                        <span>Read Book</span>
                    </Link>
                );
            case BookAccessStatus.PENDING:
                return (
                    <div className="book-action-button pending">
                        <Clock size={16} />
                        <span>Under Review</span>
                    </div>
                );
            case BookAccessStatus.REJECTED:
                return (
                    <button
                        className="book-action-button rejected"
                        onClick={() => handleRequestAccess(book.id)}
                    >
                        <Star size={16} />
                        <span>Request Again</span>
                    </button>
                );
            default:
                return (
                    <button
                        className="book-action-button request"
                        onClick={() => handleRequestAccess(book.id)}
                    >
                        <Star size={16} />
                        <span>Request Access</span>
                    </button>
                );
        }
    };

    return (
        <div className={`enhanced-books-grid ${isDarkMode ? 'dark' : ''}`}>
            {books.map(book => (
                <div className="enhanced-book-card" key={book.id}>
                    <div
                        className="book-cover"
                        style={{ backgroundColor: book.coverColor || getRandomColor(book.id) }}
                    >
                        {book.coverImage ? (
                            <img src={book.coverImage} alt={`${book.title} cover`} className="cover-image" />
                        ) : (
                            <span className="book-initials">
                {book.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
              </span>
                        )}
                        {book.progress !== undefined && (
                            <div className="book-progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${book.progress}%` }}
                                ></div>
                                <span className="progress-text">{book.progress}%</span>
                            </div>
                        )}
                        {book.rating && (
                            <div className="book-rating">
                                <Star size={14} fill="#FFD700" stroke="#FFD700" />
                                <span>{book.rating}</span>
                            </div>
                        )}
                    </div>
                    <div className="book-details">
                        <h3 className="book-title" title={book.title}>{book.title}</h3>
                        <div className="book-author">
                            <User size={14} />
                            <span>{book.author}</span>
                        </div>

                        {book.description && (
                            <p className="book-description">{book.description}</p>
                        )}

                        <div className="book-meta-info">
                            {book.published && (
                                <div className="meta-item">
                                    <Calendar size={14} />
                                    <span>{book.published}</span>
                                </div>
                            )}
                            {book.category && (
                                <div className="meta-item">
                                    <Tag size={14} />
                                    <span>{book.category}</span>
                                </div>
                            )}
                            {book.university && (
                                <div className="meta-item">
                                    <Award size={14} />
                                    <span>{book.university}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="book-actions">
                        {getAccessStatusUI(book)}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Helper function to generate random colors for book covers
function getRandomColor(id) {
    const colors = [
        "#4f46e5", "#3b82f6", "#0ea5e9", "#06b6d4",
        "#14b8a6", "#10b981", "#84cc16", "#eab308",
        "#f59e0b", "#f97316", "#ef4444", "#dc2626",
        "#ec4899", "#d946ef", "#a855f7", "#8b5cf6"
    ];

    // Use the book ID to pick a consistent color
    return colors[id % colors.length];
}

export default EnhancedBookGrid;