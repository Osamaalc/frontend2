import React, { useState, useEffect } from 'react';
import {
    Book, Search, Grid, List,
    ChevronRight, Clock, BookOpen,
    Filter, Star, Download, Eye,
    Calendar, AlertCircle
} from 'lucide-react';
import './BookshelfSection.css';

const BookshelfSection = ({ books = [], isDarkMode = false }) => {
    // State for filter and view options
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recent');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        progress: 'all', // all, inProgress, completed
        readingStatus: 'all' // all, current, toRead, finished
    });

    // Filter and sort books
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesProgress = filters.progress === 'all' ||
            (filters.progress === 'completed' && book.progress === 100) ||
            (filters.progress === 'inProgress' && book.progress < 100);

        // Apply additional filters as needed
        return matchesSearch && matchesProgress;
    });

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        switch(sortBy) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'author':
                return a.author.localeCompare(b.author);
            case 'progress':
                return b.progress - a.progress;
            case 'recent':
            default:
                return new Date(b.lastAccessed) - new Date(a.lastAccessed);
        }
    });

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Handle book actions
    const handleContinueReading = (bookId) => {
        console.log('Continue reading book ID:', bookId);
        // Implement navigation to reading interface
    };

    const handleDownload = (bookId) => {
        console.log('Download book ID:', bookId);
        // Implement download functionality
    };

    return (
        <div className={`bookshelf-section ${isDarkMode ? 'dark' : ''}`}>
            <div className="bookshelf-header">
                <div className="bookshelf-title-section">
                    <div className="bookshelf-icon">
                        <Book size={20} />
                    </div>
                    <div>
                        <h2 className="bookshelf-title">My Bookshelf</h2>
                        <p className="bookshelf-subtitle">
                            Your personal collection of academic resources
                        </p>
                    </div>
                </div>

                <div className="bookshelf-controls">
                    {/* Search Bar */}
                    <div className="search-container">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    {/* Advanced Filters Toggle */}
                    <button
                        className={`filter-toggle ${showFilters ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={16} />
                        <span>Filters</span>
                    </button>

                    {/* Sort Options */}
                    <div className="sort-container">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="recent">Recently Accessed</option>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                            <option value="progress">Reading Progress</option>
                        </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="view-toggle">
                        <button
                            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            aria-label="Grid view"
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            aria-label="List view"
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
                <div className="advanced-filters">
                    <div className="filter-group">
                        <h3 className="filter-group-title">Progress</h3>
                        <div className="filter-options">
                            <button
                                className={`filter-option ${filters.progress === 'all' ? 'active' : ''}`}
                                onClick={() => setFilters({...filters, progress: 'all'})}
                            >
                                All
                            </button>
                            <button
                                className={`filter-option ${filters.progress === 'inProgress' ? 'active' : ''}`}
                                onClick={() => setFilters({...filters, progress: 'inProgress'})}
                            >
                                In Progress
                            </button>
                            <button
                                className={`filter-option ${filters.progress === 'completed' ? 'active' : ''}`}
                                onClick={() => setFilters({...filters, progress: 'completed'})}
                            >
                                Completed
                            </button>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-group-title">Reading Status</h3>
                        <div className="filter-options">
                            <button
                                className={`filter-option ${filters.readingStatus === 'all' ? 'active' : ''}`}
                                onClick={() => setFilters({...filters, readingStatus: 'all'})}
                            >
                                All
                            </button>
                            <button
                                className={`filter-option ${filters.readingStatus === 'current' ? 'active' : ''}`}
                                onClick={() => setFilters({...filters, readingStatus: 'current'})}
                            >
                                Currently Reading
                            </button>
                            <button
                                className={`filter-option ${filters.readingStatus === 'toRead' ? 'active' : ''}`}
                                onClick={() => setFilters({...filters, readingStatus: 'toRead'})}
                            >
                                To Read
                            </button>
                            <button
                                className={`filter-option ${filters.readingStatus === 'finished' ? 'active' : ''}`}
                                onClick={() => setFilters({...filters, readingStatus: 'finished'})}
                            >
                                Finished
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {sortedBooks.length > 0 ? (
                <div className={`books-container ${viewMode}`}>
                    {viewMode === 'grid' ? (
                        /* Grid View */
                        <div className="books-grid">
                            {sortedBooks.map((book) => (
                                <div key={book.id} className="book-card">
                                    <div className="book-cover" style={{backgroundColor: book.coverColor || '#4299e1'}}>
                                        <div className="book-cover-content">
                                            <div className="book-initials">
                                                {book.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="progress-bar-container">
                                            <div className="progress-bar" style={{ width: `${book.progress}%` }}></div>
                                            <span className="progress-label">{book.progress}%</span>
                                        </div>
                                        {book.progress === 100 && (
                                            <div className="completed-badge">
                                                <Star size={12} />
                                                <span>Completed</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="book-info">
                                        <h3 className="book-title">{book.title}</h3>
                                        <p className="book-author">by {book.author}</p>
                                        <div className="book-meta">
                                            <div className="last-read">
                                                <Clock size={14} />
                                                <span>{formatDate(book.lastAccessed)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="book-actions">
                                        <button
                                            className="book-action-button primary"
                                            onClick={() => handleContinueReading(book.id)}
                                        >
                                            <BookOpen size={14} />
                                            <span>Continue</span>
                                        </button>
                                        <button
                                            className="book-action-button secondary"
                                            onClick={() => handleDownload(book.id)}
                                            title="Download for offline reading"
                                        >
                                            <Download size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* List View */
                        <div className="books-list">
                            <div className="list-header">
                                <div className="list-cell book-cell">Book</div>
                                <div className="list-cell author-cell">Author</div>
                                <div className="list-cell date-cell">Last Accessed</div>
                                <div className="list-cell progress-cell">Progress</div>
                                <div className="list-cell actions-cell">Actions</div>
                            </div>

                            {sortedBooks.map((book) => (
                                <div key={book.id} className="list-row">
                                    <div className="list-cell book-cell">
                                        <div className="list-book-info">
                                            <div className="mini-cover" style={{backgroundColor: book.coverColor || '#4299e1'}}>
                                                <span>{book.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}</span>
                                            </div>
                                            <span className="list-book-title">
                                                {book.title}
                                                {book.progress === 100 && (
                                                    <span className="list-completed-badge">
                                                        <Star size={12} />
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="list-cell author-cell">{book.author}</div>
                                    <div className="list-cell date-cell">{formatDate(book.lastAccessed)}</div>
                                    <div className="list-cell progress-cell">
                                        <div className="list-progress-container">
                                            <div className="list-progress-bar">
                                                <div
                                                    className={`list-progress-fill ${book.progress === 100 ? 'completed' : ''}`}
                                                    style={{ width: `${book.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="list-progress-text">{book.progress}%</span>
                                        </div>
                                    </div>
                                    <div className="list-cell actions-cell">
                                        <button
                                            className="list-action-button primary"
                                            onClick={() => handleContinueReading(book.id)}
                                        >
                                            <BookOpen size={14} />
                                            <span>Read</span>
                                        </button>
                                        <button
                                            className="list-action-button secondary"
                                            onClick={() => handleDownload(book.id)}
                                            title="Download for offline reading"
                                        >
                                            <Download size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* Empty state */
                <div className="empty-bookshelf">
                    <div className="empty-icon">
                        <Book size={40} />
                    </div>
                    <h3>Your bookshelf is empty</h3>
                    <p>Start adding books to your collection or try a different search term</p>
                    <button className="browse-button">
                        Browse Library
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            <div className="bookshelf-footer">
                <div className="books-count">
                    <span className="book-count-number">{sortedBooks.length}</span> of <span className="book-count-total">{books.length}</span> books
                </div>

                {books.length > 0 && (
                    <div className="books-tip">
                        <AlertCircle size={14} />
                        <span>Books downloaded for offline use will expire after 30 days</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookshelfSection;