import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Clock, Calendar, Tag, Award, Star, BookMarked, ChevronLeft, ChevronRight } from 'lucide-react';
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

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(6); // Initially show 6 books (2x3 grid)

    // Calculate total pages
    const totalPages = Math.ceil(books.length / booksPerPage);

    // Get current books for display
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // Update books per page based on screen size
    useEffect(() => {
        const handleResize = () => {
            // Adjust how many books per row based on screen width
            if (window.innerWidth >= 1200) {
                // 4 books per row on large screens = 12 books (3 rows)
                setBooksPerPage(12);
            } else if (window.innerWidth >= 992) {
                // 3 books per row on medium screens = 9 books (3 rows)
                setBooksPerPage(9);
            } else if (window.innerWidth >= 768) {
                // 2 books per row on small screens = 6 books (3 rows)
                setBooksPerPage(6);
            } else {
                // 1 book per row on mobile = 3 books (3 rows)
                setBooksPerPage(3);
            }
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle page navigation
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            // Scroll to top of grid
            document.querySelector('.enhanced-books-grid')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            // Scroll to top of grid
            document.querySelector('.enhanced-books-grid')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top of grid
        document.querySelector('.enhanced-books-grid')?.scrollIntoView({ behavior: 'smooth' });
    };

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

    // Create an array of page numbers for pagination
    const pageNumbers = [];
    const maxPageButtons = 5; // Maximum number of page buttons to show

    if (totalPages <= maxPageButtons) {
        // If we have few pages, show all numbers
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        // Always show first page
        pageNumbers.push(1);

        // Show pages around current page
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        // Add ellipsis if needed
        if (startPage > 2) {
            pageNumbers.push('...');
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // Add ellipsis if needed
        if (endPage < totalPages - 1) {
            pageNumbers.push('...');
        }

        // Always show last page
        pageNumbers.push(totalPages);
    }

    return (
        <div className="books-with-pagination">
            <div className={`enhanced-books-grid ${isDarkMode ? 'dark' : ''}`}>
                {currentBooks.map(book => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className={`pagination-controls ${isDarkMode ? 'dark' : ''}`}>
                    <button
                        className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="pagination-numbers">
                        {pageNumbers.map((number, index) => (
                            number === '...' ?
                                <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span> :
                                <button
                                    key={number}
                                    className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                                    onClick={() => goToPage(number)}
                                >
                                    {number}
                                </button>
                        ))}
                    </div>

                    <button
                        className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* Page indicator */}
            <div className={`pagination-info ${isDarkMode ? 'dark' : ''}`}>
                Showing {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, books.length)} of {books.length} books
            </div>
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