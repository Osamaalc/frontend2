import React, { useState } from 'react';
import {
    Book, Search, Grid, List,
    ChevronRight, Clock, BookOpen,
    Filter
} from 'lucide-react';
import './BookshelfSection.css';

const BookshelfSection = ({ books = [], isDarkMode = false }) => {
    // State for filter and view options
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recent');

    // Filter and sort books
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    return (
        <div className={`bookshelf-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="bookshelf-header">
                <div className="bookshelf-title-section">
                    <div className="bookshelf-icon">
                        <Book size={20} />
                    </div>
                    <div>
                        <h2 className="bookshelf-title">My Bookshelf</h2>
                        <p className="bookshelf-subtitle">
                            Your collection of books and reading materials
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

                    {/* Sort Options */}
                    <div className="sort-container">
                        <Filter size={16} className="sort-icon" />
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
                                                {book.title.split(' ').map(word => word[0]).join('').substring(0, 2)}
                                            </div>
                                        </div>
                                        <div className="progress-bar-container">
                                            <div className="progress-bar" style={{ width: `${book.progress}%` }}></div>
                                            <span className="progress-label">{book.progress}%</span>
                                        </div>
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
                                        <button className="book-action-button primary">
                                            <BookOpen size={14} />
                                            <span>Continue</span>
                                            <ChevronRight size={14} />
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
                                                <span>{book.title.split(' ').map(word => word[0]).join('').substring(0, 2)}</span>
                                            </div>
                                            <span className="list-book-title">{book.title}</span>
                                        </div>
                                    </div>
                                    <div className="list-cell author-cell">{book.author}</div>
                                    <div className="list-cell date-cell">{formatDate(book.lastAccessed)}</div>
                                    <div className="list-cell progress-cell">
                                        <div className="list-progress-container">
                                            <div className="list-progress-bar">
                                                <div className="list-progress-fill" style={{ width: `${book.progress}%` }}></div>
                                            </div>
                                            <span className="list-progress-text">{book.progress}%</span>
                                        </div>
                                    </div>
                                    <div className="list-cell actions-cell">
                                        <button className="list-action-button">
                                            <BookOpen size={14} />
                                            <span>Read</span>
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
                <p className="books-count">Showing {sortedBooks.length} of {books.length} books</p>
            </div>
        </div>
    );
};

export default BookshelfSection;