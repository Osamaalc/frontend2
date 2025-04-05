import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UniversityRow.css';

const UniversityRow = ({ isDarkMode }) => {
    const [universities, setUniversities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        totalElements: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 20
    });

    // Number of universities to display on the main page (showing only 4 on desktop)
    const visibleUniversities = 4;

    useEffect(() => {
        // In a real app, this would be an API call to fetch universities
        const fetchUniversities = async () => {
            try {
                // Simulate API call
                setTimeout(() => {
                    // This matches the provided JSON structure
                    const responseData = {
                        content: [
                            {
                                id: 1,
                                name: "Harvard University",
                                email: "info@harvard.edu",
                                location: "Cambridge, MA",
                                domain: "harvard.edu",
                                libraryName: "Widener Library",
                                representative: null
                            },
                            {
                                id: 2,
                                name: "Stanford University",
                                email: "info@stanford.edu",
                                location: "Stanford, CA",
                                domain: "stanford.edu",
                                libraryName: "Green Library",
                                representative: null
                            },
                            {
                                id: 3,
                                name: "MIT",
                                email: "info@mit.edu",
                                location: "Cambridge, MA",
                                domain: "mit.edu",
                                libraryName: "Hayden Library",
                                representative: null
                            },
                            {
                                id: 4,
                                name: "University of Oxford",
                                email: "info@ox.ac.uk",
                                location: "Oxford, UK",
                                domain: "ox.ac.uk",
                                libraryName: "Bodleian Library",
                                representative: null
                            },
                            {
                                id: 5,
                                name: "University of Cambridge",
                                email: "info@cam.ac.uk",
                                location: "Cambridge, UK",
                                domain: "cam.ac.uk",
                                libraryName: "Cambridge University Library",
                                representative: null
                            },
                            {
                                id: 6,
                                name: "King Saud University",
                                email: "info@ksu.edu.sa",
                                location: "Riyadh, Saudi Arabia",
                                domain: "ksu.edu.sa",
                                libraryName: "Central Library",
                                representative: null
                            }
                        ],
                        pageable: {
                            pageNumber: 0,
                            pageSize: 20,
                            sort: {
                                sorted: false,
                                empty: true,
                                unsorted: true
                            },
                            offset: 0,
                            paged: true,
                            unpaged: false
                        },
                        last: true,
                        totalPages: 1,
                        totalElements: 6,
                        first: true,
                        size: 20,
                        number: 0,
                        sort: {
                            sorted: false,
                            empty: true,
                            unsorted: true
                        },
                        numberOfElements: 6,
                        empty: false
                    };

                    setUniversities(responseData.content);
                    setPagination({
                        totalElements: responseData.totalElements,
                        totalPages: responseData.totalPages,
                        currentPage: responseData.number,
                        pageSize: responseData.size
                    });
                    setIsLoading(false);
                }, 800); // Simulate network delay
            } catch (error) {
                setError("Failed to load universities. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    // Function to generate initials logo from university name
    const getInitials = (name) => {
        if (!name) return "UN";

        // Handle names with spaces like "Harvard University" -> "HU"
        const words = name.split(' ');
        if (words.length > 1) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }

        // For single word names like "MIT"
        return name.substring(0, 2).toUpperCase();
    };

    if (isLoading) {
        return (
            <div className={`university-row-container ${isDarkMode ? 'dark' : ''}`}>
                <div className="universities-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading universities...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`university-row-container ${isDarkMode ? 'dark' : ''}`}>
                <div className="universities-error">
                    <p>{error}</p>
                    <button className="retry-button">Retry</button>
                </div>
            </div>
        );
    }

    // Only show the first 'visibleUniversities' number of universities
    const visibleUniversitiesList = universities.slice(0, visibleUniversities);
    const remainingCount = Math.max(0, universities.length - visibleUniversities);

    return (
        <div className={`university-row-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="universities-header">
                <h2>Universities</h2>
                <span className="remaining-count">
                    {remainingCount > 0 && `+${remainingCount} more`}
                </span>
            </div>

            <div className="universities-scroll">
                <div className="universities-list">
                    {visibleUniversitiesList.map(university => (
                        <Link
                            to={`/university/${university.id}`}
                            key={university.id}
                            className="university-card"
                        >
                            <div className="university-logo-wrapper">
                                <div className="university-logo">
                                    {getInitials(university.name)}
                                </div>
                            </div>
                            <div className="university-info">
                                <h3 className="university-name">{university.name}</h3>
                                <p className="university-location">{university.location}</p>
                                <div className="university-meta">
                                    <span className="library-name">{university.libraryName}</span>
                                    <div className="books-count">
                                        <span>{pagination.totalElements} Books</span>
                                    </div>
                                </div>
                                <button className="view-books-btn">View Books</button>
                            </div>
                        </Link>
                    ))}

                    {/* View All Card */}
                    {universities.length > visibleUniversities && (
                        <Link to="/universities" className="university-card view-all-card">
                            <div className="university-logo-wrapper">
                                <div className="university-logo all">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="university-info">
                                <h3 className="university-name">View All</h3>
                                <p className="university-location">Total: {pagination.totalElements}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UniversityRow;