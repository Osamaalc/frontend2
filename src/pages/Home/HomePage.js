import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
// Use these paths:
import UniversityRow from '../../components/UniversityRow';
import CategorySidebar from '../../components/CategorySidebar';
import EnhancedBookGrid from '../../components/BookGrid'; // Updated component name
import './HomePage.css';

const HomePage = ({ isDarkMode }) => {
    const navigate = useNavigate();
    const { universityId } = useParams(); // In case we're viewing books for a specific university

    const [books, setBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [errorBooks, setErrorBooks] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState(universityId || null);
    const [currentUniversityName, setCurrentUniversityName] = useState('');

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    // Handle category selection
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        // In a real app, this would fetch books for the selected category
    };

    // Handle book access requests
    const handleRequestAccess = (bookId) => {
        console.log(`Access requested for book ID: ${bookId}`);
        // In a real app, you would send this request to your backend
        // and update the book status accordingly
    };

    // Fetch books - in a real app, this would use API calls
    useEffect(() => {
        // Simulate API call to fetch books
        setLoadingBooks(true);

        // Simulate network delay
        setTimeout(() => {
            try {
                // Generate sample books data with enhanced details
                const sampleBooks = generateEnhancedSampleBooks(selectedUniversity, selectedCategory, searchQuery);
                setBooks(sampleBooks);
                setLoadingBooks(false);
            } catch (error) {
                setErrorBooks("Failed to load books. Please try again.");
                setLoadingBooks(false);
            }
        }, 800);

        // Update university name if selected
        if (selectedUniversity) {
            // In a real app, this would fetch university details by ID
            const universityNames = {
                "1": "Harvard University",
                "2": "Stanford University",
                "3": "MIT",
                "4": "University of Oxford",
                "5": "University of Cambridge",
                "6": "King Saud University"
            };
            setCurrentUniversityName(universityNames[selectedUniversity] || "Selected University");
        } else {
            setCurrentUniversityName('');
        }
    }, [selectedUniversity, selectedCategory, searchQuery]);

    return (
        <main className={`home-page ${isDarkMode ? 'dark' : ''}`}>
            {/* Universities Row */}
            <section className="universities-section">
                <UniversityRow isDarkMode={isDarkMode} />
            </section>

            {/* Main Content */}
            <div className="main-content-container">
                <div className="container22">
                    {/* Heading and filters */}
                    <div className="content-header">
                        <div className="page-heading">
                            <h1>
                                {selectedUniversity ?
                                    `Books from ${currentUniversityName}` :
                                    'Explore Educational Resources'
                                }
                            </h1>

                            {selectedUniversity && (
                                <button
                                    className="clear-university"
                                    onClick={() => {
                                        setSelectedUniversity(null);
                                        navigate('/');
                                    }}
                                >
                                    <X size={16} />
                                    <span>Clear university filter</span>
                                </button>
                            )}
                        </div>

                        <div className="search-bar">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for books, authors, or topics..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            {searchQuery && (
                                <button className="clear-search" onClick={clearSearch}>
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Main grid with sidebar and content */}
                    <div className="content-grid">
                        {/* Sidebar */}
                        <div className="sidebar-container">
                            <CategorySidebar
                                isDarkMode={isDarkMode}
                                onSelectCategory={handleCategorySelect}
                                selectedCategory={selectedCategory}
                            />
                        </div>

                        {/* Books content */}
                        <div className="books-container">
                            <div className="books-header">
                                <h2>
                                    {selectedCategory ?
                                        getCategoryName(selectedCategory) :
                                        'All Books'
                                    }
                                </h2>

                                {selectedCategory && (
                                    <button
                                        className="clear-category"
                                        onClick={() => setSelectedCategory(null)}
                                    >
                                        <X size={16} />
                                        <span>Clear category</span>
                                    </button>
                                )}
                            </div>

                            {/* Enhanced Books grid */}
                            <EnhancedBookGrid
                                books={books}
                                loading={loadingBooks}
                                error={errorBooks}
                                isDarkMode={isDarkMode}
                                onRequestAccess={handleRequestAccess}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

// Helper function to get category name from ID
function getCategoryName(categoryId) {
    const categoryMap = {
        'cs-prog': 'Programming',
        'cs-ai': 'Artificial Intelligence',
        'cs-data': 'Data Science',
        'cs-sec': 'Cybersecurity',
        'cs-web': 'Web Development',
        'cs-net': 'Computer Networks',
        'med-anatomy': 'Anatomy',
        'med-pharm': 'Pharmacology',
        'med-neuro': 'Neuroscience',
        'med-cardio': 'Cardiology',
        'bus-mgmt': 'Management',
        'bus-fin': 'Finance',
        'bus-mktg': 'Marketing',
        'bus-econ': 'Economics',
        'eng-mech': 'Mechanical Engineering',
        'eng-elec': 'Electrical Engineering',
        'eng-civil': 'Civil Engineering',
        'eng-chem': 'Chemical Engineering',
        'hum-lit': 'Literature',
        'hum-phil': 'Philosophy',
        'hum-hist': 'History',
        'hum-arts': 'Arts',
        'hum-lang': 'Languages'
    };

    return categoryMap[categoryId] || 'Selected Category';
}

// Helper function to generate enhanced sample books
function generateEnhancedSampleBooks(universityId, categoryId, searchQuery) {
    // Sample book data with enhanced information
    const allBooks = [
        {
            id: 1,
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            description: "A comprehensive introduction to the modern study of computer algorithms",
            published: "2022",
            category: "Programming",
            university: "Harvard University",
            rating: 4.8,
            progress: 65,
            accessStatus: "APPROVED",
            coverColor: "#4f46e5"
        },
        {
            id: 2,
            title: "Artificial Intelligence: A Modern Approach",
            author: "Stuart Russell",
            description: "The leading textbook in Artificial Intelligence, used in over 1500 universities worldwide",
            published: "2021",
            category: "Artificial Intelligence",
            university: "Stanford University",
            rating: 4.7,
            progress: 32,
            coverColor: "#3b82f6"
        },
        {
            id: 3,
            title: "Database Systems: The Complete Book",
            author: "Hector Garcia-Molina",
            description: "Covers database design, implementation, and accessing databases as resources from applications",
            published: "2023",
            category: "Data Science",
            university: "MIT",
            rating: 4.5,
            accessStatus: "PENDING",
            coverColor: "#06b6d4"
        },
        {
            id: 4,
            title: "Clean Code: A Handbook of Agile Software Craftsmanship",
            author: "Robert C. Martin",
            description: "A handbook of agile software craftsmanship that helps programmers write better code",
            published: "2020",
            category: "Programming",
            university: "University of Oxford",
            rating: 4.9,
            accessStatus: "REJECTED",
            coverColor: "#10b981"
        },
        {
            id: 5,
            title: "Design Patterns: Elements of Reusable Object-Oriented Software",
            author: "Erich Gamma",
            description: "Capturing expertise in object-oriented software design as design patterns",
            published: "2019",
            category: "Programming",
            university: "University of Cambridge",
            rating: 4.6,
            progress: 88,
            coverColor: "#84cc16"
        },
        {
            id: 6,
            title: "Deep Learning",
            author: "Ian Goodfellow",
            description: "An introduction to a broad range of topics in deep learning, covering mathematical and conceptual background",
            published: "2022",
            category: "Artificial Intelligence",
            university: "Harvard University",
            rating: 4.8,
            accessStatus: "APPROVED",
            progress: 45,
            coverColor: "#8b5cf6"
        },
        {
            id: 7,
            title: "Machine Learning: A Probabilistic Perspective",
            author: "Kevin P. Murphy",
            description: "A comprehensive introduction to machine learning that uses probabilistic models and inference as a unifying approach",
            published: "2023",
            category: "Artificial Intelligence",
            university: "Stanford University",
            rating: 4.7,
            coverColor: "#ec4899"
        },
        {
            id: 8,
            title: "Gray's Anatomy",
            author: "Henry Gray",
            description: "The classic anatomy textbook, comprehensive and detailed for medical students and healthcare professionals",
            published: "2021",
            category: "Anatomy",
            university: "MIT",
            rating: 4.9,
            coverColor: "#f97316"
        },
        {
            id: 9,
            title: "Principles of Neural Science",
            author: "Eric R. Kandel",
            description: "The definitive textbook on the science of the brain and nervous system",
            published: "2022",
            category: "Neuroscience",
            university: "University of Oxford",
            rating: 4.6,
            accessStatus: "PENDING",
            coverColor: "#ef4444"
        },
        {
            id: 10,
            title: "Principles of Marketing",
            author: "Philip Kotler",
            description: "The gold standard for teaching marketing principles, combining theory and practical examples",
            published: "2023",
            category: "Marketing",
            university: "University of Cambridge",
            rating: 4.5,
            progress: 12,
            coverColor: "#0ea5e9"
        },
        {
            id: 11,
            title: "Financial Management",
            author: "Prasanna Chandra",
            description: "A comprehensive textbook on financial management principles and practices",
            published: "2021",
            category: "Finance",
            university: "King Saud University",
            rating: 4.3,
            accessStatus: "REJECTED",
            coverColor: "#f59e0b"
        },
        {
            id: 12,
            title: "Mechanical Engineering Design",
            author: "Joseph Shigley",
            description: "The standard machine design handbook for mechanical engineers in the design field",
            published: "2020",
            category: "Mechanical Engineering",
            university: "Harvard University",
            rating: 4.7,
            coverColor: "#14b8a6"
        }
    ];

    // Convert raw book data to category and university IDs for filtering
    const bookCategoryMap = {
        'Programming': 'cs-prog',
        'Artificial Intelligence': 'cs-ai',
        'Data Science': 'cs-data',
        'Anatomy': 'med-anatomy',
        'Neuroscience': 'med-neuro',
        'Marketing': 'bus-mktg',
        'Finance': 'bus-fin',
        'Mechanical Engineering': 'eng-mech'
    };

    const universityIdMap = {
        'Harvard University': '1',
        'Stanford University': '2',
        'MIT': '3',
        'University of Oxford': '4',
        'University of Cambridge': '5',
        'King Saud University': '6'
    };

    // Filter books based on selected university
    let filteredBooks = [...allBooks];

    if (universityId) {
        filteredBooks = filteredBooks.filter(book =>
            universityIdMap[book.university] === universityId
        );
    }

    // Filter by category if selected
    if (categoryId) {
        filteredBooks = filteredBooks.filter(book =>
            bookCategoryMap[book.category] === categoryId
        );
    }

    // Filter by search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
    }

    return filteredBooks;
}

export default HomePage;