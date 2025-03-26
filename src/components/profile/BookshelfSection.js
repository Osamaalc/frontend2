import React, { useState } from 'react';
import './BookshelfSection.css';

const BookshelfSection = ({ bookshelfData }) => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('lastAccessed'); // 'title', 'author', 'lastAccessed', 'progress'
    const [searchTerm, setSearchTerm] = useState('');

    // Sort books based on selected option
    const sortedBooks = [...bookshelfData].sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'author') {
            return a.author.localeCompare(b.author);
        } else if (sortBy === 'lastAccessed') {
            return new Date(b.lastAccessed) - new Date(a.lastAccessed);
        } else if (sortBy === 'progress') {
            return b.progress - a.progress;
        }
        return 0;
    });

    // Filter books based on search term
    const filteredBooks = sortedBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="bookshelf-container">
            <div className="section-header">
                <h2>My Bookshelf</h2>
                <p className="section-description">Books you have accessed recently or added to your collection</p>
            </div>

            <div className="bookshelf-controls">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search books by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>

                <div className="view-options">
                    <div className="sort-by">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="lastAccessed">Recently Accessed</option>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                            <option value="progress">Reading Progress</option>
                        </select>
                    </div>

                    <div className="view-toggle">
                        <button
                            className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            aria-label="Grid view"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </button>
                        <button
                            className={`toggle-button ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            aria-label="List view"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`bookshelf-content ${viewMode}`}>
                {filteredBooks.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="books-grid">
                            {filteredBooks.map((book) => (
                                <div key={book.id} className="book-card">
                                    <div className="book-cover">
                                        {/* In a real app, this would be an actual book cover image */}
                                        <div className="book-cover-placeholder">
                                            <span className="book-initials">
                                                {book.title.split(' ').map(word => word[0]).join('').substring(0, 2)}
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${book.progress}%` }}
                                                data-progress={`${book.progress}%`}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="book-info">
                                        <h3 className="book-title">{book.title}</h3>
                                        <p className="book-author">by {book.author}</p>
                                        <p className="book-last-accessed">Last read: {formatDate(book.lastAccessed)}</p>
                                    </div>
                                    <div className="book-actions">
                                        <button className="action-button primary">Continue Reading</button>
                                        <button className="action-button secondary">Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="books-list">
                            <div className="list-header">
                                <div className="list-cell title-cell">Title</div>
                                <div className="list-cell author-cell">Author</div>
                                <div className="list-cell access-cell">Last Accessed</div>
                                <div className="list-cell progress-cell">Progress</div>
                                <div className="list-cell actions-cell">Actions</div>
                            </div>
                            {filteredBooks.map((book) => (
                                <div key={book.id} className="list-row">
                                    <div className="list-cell title-cell">{book.title}</div>
                                    <div className="list-cell author-cell">{book.author}</div>
                                    <div className="list-cell access-cell">{formatDate(book.lastAccessed)}</div>
                                    <div className="list-cell progress-cell">
                                        <div className="progress-container">
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${book.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="progress-text">{book.progress}%</span>
                                        </div>
                                    </div>
                                    <div className="list-cell actions-cell">
                                        <button className="action-button-small primary">Read</button>
                                        <button className="action-button-small secondary">Info</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                            </svg>
                        </div>
                        <h3>No books found</h3>
                        <p>Your bookshelf is empty or no books match your search criteria.</p>
                        <button className="browse-button">
                            Browse Library
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="bookshelf-footer">
                <p>Showing {filteredBooks.length} of {bookshelfData.length} books</p>
                <button className="browse-more-button">
                    Browse Library Catalog
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BookshelfSection;