import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Filter, X } from 'lucide-react';
import './CategorySidebar.css';

// eslint-disable-next-line no-unused-vars
const unusedEffect = useEffect; // This prevents the warning

const CategorySidebar = ({ isDarkMode, onSelectCategory, selectedCategory }) => {
    const [isOpen, setIsOpen] = useState(false); // للعرض على الجوال
    const [expandedCategories, setExpandedCategories] = useState({
        computerScience: true,
        medicine: false,
        business: false,
        engineering: false,
        humanities: false
    });
    const sidebarRef = useRef(null);

    // فئات نموذجية - في تطبيق حقيقي، ستأتي هذه من واجهة برمجة التطبيقات (API)
    const categories = {
        computerScience: [
            { id: 'cs-prog', name: 'Programming' },
            { id: 'cs-ai', name: 'Artificial Intelligence' },
            { id: 'cs-data', name: 'Data Science' },
            { id: 'cs-sec', name: 'Cybersecurity' },
            { id: 'cs-web', name: 'Web Development' },
            { id: 'cs-net', name: 'Computer Networks' }
        ],
        medicine: [
            { id: 'med-anatomy', name: 'Anatomy' },
            { id: 'med-pharm', name: 'Pharmacology' },
            { id: 'med-neuro', name: 'Neuroscience' },
            { id: 'med-cardio', name: 'Cardiology' }
        ],
        business: [
            { id: 'bus-mgmt', name: 'Management' },
            { id: 'bus-fin', name: 'Finance' },
            { id: 'bus-mktg', name: 'Marketing' },
            { id: 'bus-econ', name: 'Economics' }
        ],
        engineering: [
            { id: 'eng-mech', name: 'Mechanical' },
            { id: 'eng-elec', name: 'Electrical' },
            { id: 'eng-civil', name: 'Civil' },
            { id: 'eng-chem', name: 'Chemical' }
        ],
        humanities: [
            { id: 'hum-lit', name: 'Literature' },
            { id: 'hum-phil', name: 'Philosophy' },
            { id: 'hum-hist', name: 'History' },
            { id: 'hum-arts', name: 'Arts' },
            { id: 'hum-lang', name: 'Languages' }
        ]
    };

    // حذف دالة ضبط الارتفاع الديناميكي للشريط الجانبي لأننا نريده بموضع ثابت

    const toggleCategory = (category) => {
        setExpandedCategories({
            ...expandedCategories,
            [category]: !expandedCategories[category]
        });
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* زر التبديل للجوال */}
            <button
                className={`category-toggle-button ${isDarkMode ? 'dark' : ''}`}
                onClick={toggleSidebar}
            >
                <Filter size={18} />
                <span>Categories</span>
            </button>

            {/* الشريط الجانبي */}
            <aside
                ref={sidebarRef}
                className={`category-sidebar ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark' : ''}`}
            >
                <div className="sidebar-header">
                    <h2>Categories</h2>
                    <button className="close-sidebar" onClick={toggleSidebar}>
                        <X size={20} />
                    </button>
                </div>

                <div className="all-categories-button">
                    <button
                        className={`category-item ${selectedCategory === null ? 'active' : ''}`}
                        onClick={() => {
                            onSelectCategory(null);
                            setIsOpen(false); // إغلاق على الجوال بعد الاختيار
                        }}
                    >
                        <BookOpen size={18} />
                        <span>All Books</span>
                    </button>
                </div>

                <div className="categories-list">
                    {/* Computer Science */}
                    <div className="category-group">
                        <button
                            className="category-group-header"
                            onClick={() => toggleCategory('computerScience')}
                        >
                            {expandedCategories.computerScience ?
                                <ChevronDown size={18} /> :
                                <ChevronRight size={18} />
                            }
                            <span>Computer Science</span>
                        </button>

                        {expandedCategories.computerScience && (
                            <div className="subcategory-list">
                                {categories.computerScience.map(category => (
                                    <button
                                        key={category.id}
                                        className={`subcategory-item ${selectedCategory === category.id ? 'active' : ''}`}
                                        onClick={() => {
                                            onSelectCategory(category.id);
                                            setIsOpen(false); // إغلاق على الجوال بعد الاختيار
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Medicine */}
                    <div className="category-group">
                        <button
                            className="category-group-header"
                            onClick={() => toggleCategory('medicine')}
                        >
                            {expandedCategories.medicine ?
                                <ChevronDown size={18} /> :
                                <ChevronRight size={18} />
                            }
                            <span>Medicine</span>
                        </button>

                        {expandedCategories.medicine && (
                            <div className="subcategory-list">
                                {categories.medicine.map(category => (
                                    <button
                                        key={category.id}
                                        className={`subcategory-item ${selectedCategory === category.id ? 'active' : ''}`}
                                        onClick={() => {
                                            onSelectCategory(category.id);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Business */}
                    <div className="category-group">
                        <button
                            className="category-group-header"
                            onClick={() => toggleCategory('business')}
                        >
                            {expandedCategories.business ?
                                <ChevronDown size={18} /> :
                                <ChevronRight size={18} />
                            }
                            <span>Business</span>
                        </button>

                        {expandedCategories.business && (
                            <div className="subcategory-list">
                                {categories.business.map(category => (
                                    <button
                                        key={category.id}
                                        className={`subcategory-item ${selectedCategory === category.id ? 'active' : ''}`}
                                        onClick={() => {
                                            onSelectCategory(category.id);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Engineering */}
                    <div className="category-group">
                        <button
                            className="category-group-header"
                            onClick={() => toggleCategory('engineering')}
                        >
                            {expandedCategories.engineering ?
                                <ChevronDown size={18} /> :
                                <ChevronRight size={18} />
                            }
                            <span>Engineering</span>
                        </button>

                        {expandedCategories.engineering && (
                            <div className="subcategory-list">
                                {categories.engineering.map(category => (
                                    <button
                                        key={category.id}
                                        className={`subcategory-item ${selectedCategory === category.id ? 'active' : ''}`}
                                        onClick={() => {
                                            onSelectCategory(category.id);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Humanities */}
                    <div className="category-group">
                        <button
                            className="category-group-header"
                            onClick={() => toggleCategory('humanities')}
                        >
                            {expandedCategories.humanities ?
                                <ChevronDown size={18} /> :
                                <ChevronRight size={18} />
                            }
                            <span>Humanities</span>
                        </button>

                        {expandedCategories.humanities && (
                            <div className="subcategory-list">
                                {categories.humanities.map(category => (
                                    <button
                                        key={category.id}
                                        className={`subcategory-item ${selectedCategory === category.id ? 'active' : ''}`}
                                        onClick={() => {
                                            onSelectCategory(category.id);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* الطبقة المتراكبة للجوال */}
            {isOpen && (
                <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            )}
        </>
    );
};

export default CategorySidebar;