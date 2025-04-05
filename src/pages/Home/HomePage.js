import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, X, Filter } from 'lucide-react';
// Use these paths:
import UniversityRow from '../../components/UniversityRow';
import CategorySidebar from '../../components/CategorySidebar';
import EnhancedBookGrid from '../../components/BookGrid';
import './HomePage.css';

const HomePage = ({ isDarkMode }) => {
    const navigate = useNavigate();
    const { universityId } = useParams();

    const [books, setBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [errorBooks, setErrorBooks] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState(universityId || null);
    const [currentUniversityName, setCurrentUniversityName] = useState('');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

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
        setShowMobileFilters(false); // Close mobile filters after selection
    };

    // Handle book access requests
    const handleRequestAccess = (bookId) => {
        console.log(`Access requested for book ID: ${bookId}`);
    };

    // Toggle mobile filters
    const toggleMobileFilters = () => {
        setShowMobileFilters(!showMobileFilters);
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
                    {/* Heading */}
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
                    </div>

                    {/* Improved layout with filters and search */}
                    <div className="improved-layout">
                        {/* Left sidebar */}
                        <div className={`sidebar-container ${showMobileFilters ? 'mobile-active' : ''}`}>
                            <CategorySidebar
                                isDarkMode={isDarkMode}
                                onSelectCategory={handleCategorySelect}
                                selectedCategory={selectedCategory}
                            />
                        </div>

                        {/* Main content area */}
                        <div className="main-content-area">
                            {/* Filters and search row */}
                            <div className="filters-search-row">
                                <button
                                    className={`mobile-filters-toggle ${isDarkMode ? 'dark' : ''}`}
                                    onClick={toggleMobileFilters}
                                >
                                    <Filter size={18} />
                                    <span>Categories</span>
                                </button>

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

                            {/* Books header */}
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

                            {/* Books grid */}
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

            {/* Mobile overlay for filter sidebar */}
            {showMobileFilters && (
                <div className="mobile-sidebar-overlay" onClick={toggleMobileFilters}></div>
            )}
        </main>
    );
};

// Helper functions remain the same
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
    // Sample book data with enhanced information - EXPANDED VERSION
    const allBooks = [
        // Original books
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
        },

        // Additional books - Computer Science / Programming
        {
            id: 13,
            title: "JavaScript: The Good Parts",
            author: "Douglas Crockford",
            description: "Takes the reader on a journey through JavaScript, revealing the elegant parts of an overlooked programming language",
            published: "2021",
            category: "Programming",
            university: "Stanford University",
            rating: 4.6,
            progress: 38,
            coverColor: "#ca8a04"
        },
        {
            id: 14,
            title: "Python Crash Course",
            author: "Eric Matthes",
            description: "A fast-paced, thorough introduction to Python that will get you writing programs, solving problems, and making things that work",
            published: "2022",
            category: "Programming",
            university: "MIT",
            rating: 4.8,
            accessStatus: "APPROVED",
            coverColor: "#4338ca"
        },
        {
            id: 15,
            title: "Compilers: Principles, Techniques, and Tools",
            author: "Alfred V. Aho",
            description: "Known as the 'Dragon Book', this classic covers the theory and design of compilers in detail",
            published: "2019",
            category: "Programming",
            university: "University of Cambridge",
            rating: 4.7,
            coverColor: "#b91c1c"
        },
        {
            id: 16,
            title: "Computer Networks",
            author: "Andrew S. Tanenbaum",
            description: "A comprehensive introduction to modern computer networking concepts and protocols",
            published: "2020",
            category: "Computer Networks",
            university: "Harvard University",
            rating: 4.6,
            accessStatus: "PENDING",
            coverColor: "#be123c"
        },

        // Additional books - Artificial Intelligence
        {
            id: 17,
            title: "Reinforcement Learning: An Introduction",
            author: "Richard S. Sutton",
            description: "The highly acclaimed introduction to reinforcement learning, the computational approach to learning from interaction",
            published: "2022",
            category: "Artificial Intelligence",
            university: "MIT",
            rating: 4.9,
            progress: 55,
            coverColor: "#6d28d9"
        },
        {
            id: 18,
            title: "Neural Networks and Deep Learning",
            author: "Michael Nielsen",
            description: "A clear explanation of neural networks theory and implementation, suitable for students and professionals",
            published: "2023",
            category: "Artificial Intelligence",
            university: "Stanford University",
            rating: 4.7,
            accessStatus: "APPROVED",
            coverColor: "#7c3aed"
        },
        {
            id: 19,
            title: "Natural Language Processing with Python",
            author: "Steven Bird",
            description: "Practical introduction to programming for language processing, using the Python language and NLTK platform",
            published: "2021",
            category: "Artificial Intelligence",
            university: "University of Oxford",
            rating: 4.5,
            coverColor: "#9333ea"
        },

        // Additional books - Data Science
        {
            id: 20,
            title: "The Elements of Statistical Learning",
            author: "Trevor Hastie",
            description: "A comprehensive and rigorous introduction to modern statistical methods for data analysis",
            published: "2020",
            category: "Data Science",
            university: "Stanford University",
            rating: 4.9,
            accessStatus: "PENDING",
            coverColor: "#3730a3"
        },
        {
            id: 21,
            title: "Python for Data Analysis",
            author: "Wes McKinney",
            description: "A comprehensive guide to the Python data analysis stack, including pandas, NumPy, and IPython",
            published: "2022",
            category: "Data Science",
            university: "MIT",
            rating: 4.8,
            progress: 72,
            coverColor: "#0369a1"
        },
        {
            id: 22,
            title: "Data Science from Scratch",
            author: "Joel Grus",
            description: "First principles approach to data science using Python to implement essential algorithms from scratch",
            published: "2021",
            category: "Data Science",
            university: "University of Cambridge",
            rating: 4.6,
            accessStatus: "APPROVED",
            coverColor: "#0e7490"
        },

        // Additional books - Medicine
        {
            id: 23,
            title: "Harrison's Principles of Internal Medicine",
            author: "Dennis L. Kasper",
            description: "The definitive guide to internal medicine, covering the latest developments in the field",
            published: "2022",
            category: "Medicine",
            university: "Harvard University",
            rating: 4.9,
            coverColor: "#0f766e"
        },
        {
            id: 24,
            title: "Robbins Basic Pathology",
            author: "Vinay Kumar",
            description: "A concise text that delivers the core concepts of pathology with exceptional clarity",
            published: "2021",
            category: "Medicine",
            university: "Stanford University",
            rating: 4.7,
            accessStatus: "PENDING",
            coverColor: "#047857"
        },
        {
            id: 25,
            title: "Clinical Pharmacology",
            author: "Morris J. Brown",
            description: "A comprehensive resource on the science of drug therapy for healthcare professionals",
            published: "2023",
            category: "Pharmacology",
            university: "University of Oxford",
            rating: 4.6,
            progress: 28,
            coverColor: "#166534"
        },
        {
            id: 26,
            title: "Neuroscience: Exploring the Brain",
            author: "Mark F. Bear",
            description: "A comprehensive introduction to the field of neuroscience, from molecules to behavior",
            published: "2020",
            category: "Neuroscience",
            university: "MIT",
            rating: 4.8,
            accessStatus: "APPROVED",
            coverColor: "#365314"
        },

        // Additional books - Business
        {
            id: 27,
            title: "Essentials of Economics",
            author: "N. Gregory Mankiw",
            description: "A concise introduction to the principles of economics for students and general readers",
            published: "2022",
            category: "Economics",
            university: "Harvard University",
            rating: 4.5,
            coverColor: "#854d0e"
        },
        {
            id: 28,
            title: "Financial Accounting",
            author: "Charles T. Horngren",
            description: "A student-friendly introduction to the fundamental concepts of financial accounting",
            published: "2021",
            category: "Finance",
            university: "University of Cambridge",
            rating: 4.3,
            accessStatus: "REJECTED",
            coverColor: "#a16207"
        },
        {
            id: 29,
            title: "Marketing Management",
            author: "Philip Kotler",
            description: "The gold standard for graduate-level marketing management courses, offering comprehensive coverage of marketing topics",
            published: "2023",
            category: "Marketing",
            university: "Stanford University",
            rating: 4.7,
            progress: 48,
            coverColor: "#b45309"
        },
        {
            id: 30,
            title: "Organizational Behavior",
            author: "Stephen P. Robbins",
            description: "A comprehensive exploration of the key concepts of organizational behavior in modern business",
            published: "2020",
            category: "Management",
            university: "King Saud University",
            rating: 4.4,
            accessStatus: "PENDING",
            coverColor: "#c2410c"
        },

        // Additional books - Engineering
        {
            id: 31,
            title: "Fundamentals of Electric Circuits",
            author: "Charles K. Alexander",
            description: "A clear and comprehensive introduction to electric circuit analysis for engineering students",
            published: "2021",
            category: "Electrical Engineering",
            university: "MIT",
            rating: 4.6,
            coverColor: "#b45309"
        },
        {
            id: 32,
            title: "Fluid Mechanics",
            author: "Frank M. White",
            description: "A comprehensive resource for fluid mechanics fundamentals and applications",
            published: "2022",
            category: "Mechanical Engineering",
            university: "University of Cambridge",
            rating: 4.7,
            accessStatus: "APPROVED",
            progress: 65,
            coverColor: "#db2777"
        },
        {
            id: 33,
            title: "Structural Analysis",
            author: "R.C. Hibbeler",
            description: "A thorough exploration of the theory and application of structural analysis principles",
            published: "2020",
            category: "Civil Engineering",
            university: "Harvard University",
            rating: 4.5,
            coverColor: "#9d174d"
        },
        {
            id: 34,
            title: "Chemical Process Principles",
            author: "Olaf A. Hougen",
            description: "A fundamental textbook for chemical engineering students covering material and energy balances",
            published: "2021",
            category: "Chemical Engineering",
            university: "Stanford University",
            rating: 4.4,
            accessStatus: "PENDING",
            coverColor: "#e11d48"
        },

        // Additional books - Humanities
        {
            id: 35,
            title: "The Norton Anthology of World Literature",
            author: "Martin Puchner",
            description: "A comprehensive collection of literary works from around the world and throughout history",
            published: "2022",
            category: "Literature",
            university: "University of Oxford",
            rating: 4.8,
            progress: 35,
            coverColor: "#a21caf"
        },
        {
            id: 36,
            title: "A History of Western Philosophy",
            author: "Bertrand Russell",
            description: "A comprehensive survey of Western philosophy from the pre-Socratic philosophers to the early 20th century",
            published: "2019",
            category: "Philosophy",
            university: "University of Cambridge",
            rating: 4.9,
            accessStatus: "APPROVED",
            coverColor: "#c026d3"
        },
        {
            id: 37,
            title: "A People's History of the United States",
            author: "Howard Zinn",
            description: "A history of the United States from the perspective of often marginalized groups",
            published: "2020",
            category: "History",
            university: "Harvard University",
            rating: 4.7,
            coverColor: "#d946ef"
        },
        {
            id: 38,
            title: "The Story of Art",
            author: "E.H. Gombrich",
            description: "A comprehensive introduction to the history of art, from prehistoric cave paintings to modern times",
            published: "2021",
            category: "Arts",
            university: "King Saud University",
            rating: 4.6,
            accessStatus: "REJECTED",
            coverColor: "#701a75"
        },
        {
            id: 39,
            title: "Linguistics: An Introduction to Language and Communication",
            author: "Adrian Akmajian",
            description: "A comprehensive introduction to linguistics, covering all major aspects of language",
            published: "2023",
            category: "Languages",
            university: "MIT",
            rating: 4.5,
            progress: 42,
            coverColor: "#86198f"
        },
        {
            id: 40,
            title: "Contemporary Art: World Currents",
            author: "Terry Smith",
            description: "A global survey of contemporary art examining diverse art forms from around the world",
            published: "2022",
            category: "Arts",
            university: "Stanford University",
            rating: 4.4,
            accessStatus: "PENDING",
            coverColor: "#a21caf"
        }
    ];

    // Convert raw book data to category and university IDs for filtering
    const bookCategoryMap = {
        'Programming': 'cs-prog',
        'Artificial Intelligence': 'cs-ai',
        'Data Science': 'cs-data',
        'Computer Networks': 'cs-net',
        'Cybersecurity': 'cs-sec',
        'Web Development': 'cs-web',
        'Anatomy': 'med-anatomy',
        'Neuroscience': 'med-neuro',
        'Pharmacology': 'med-pharm',
        'Medicine': 'med-cardio',
        'Marketing': 'bus-mktg',
        'Finance': 'bus-fin',
        'Economics': 'bus-econ',
        'Management': 'bus-mgmt',
        'Mechanical Engineering': 'eng-mech',
        'Electrical Engineering': 'eng-elec',
        'Civil Engineering': 'eng-civil',
        'Chemical Engineering': 'eng-chem',
        'Literature': 'hum-lit',
        'Philosophy': 'hum-phil',
        'History': 'hum-hist',
        'Arts': 'hum-arts',
        'Languages': 'hum-lang'
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