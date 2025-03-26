import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, User, Bell, LogOut, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isDarkMode, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    // عناصر التنقل
    const navItems = [
        { name: 'Home', href: '/', hasDropdown: false },
        { name: 'About Us', href: '/about', hasDropdown: false },
        { name: 'Contact', href: '/contact', hasDropdown: false },
    ];

    // التعامل مع حدث التمرير
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // تبديل قائمة المستخدم
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // إغلاق القائمة المحمولة عند النقر على رابط
    const closeMobileMenu = () => {
        setIsOpen(false);
    };

    // التنقل إلى صفحة الملف الشخصي
    const goToProfile = () => {
        navigate('/profile');
        setIsUserMenuOpen(false);
        closeMobileMenu();
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : ''}`}>
            <div className="container">
                <div className="header-content">
                    {/* الشعار */}
                    <div className="logo">
                        <Link to="/" className="logo-link">
                            <div className="logo-text">LOGO</div>
                        </Link>
                    </div>

                    {/* التنقل للأجهزة المكتبية */}
                    <nav className="desktop-nav">
                        <div className="nav-items">
                            {navItems.map((item) => (
                                <div key={item.name} className="nav-item">
                                    {item.href.startsWith('#') ? (
                                        <a
                                            href={item.href}
                                            className="nav-link"
                                        >
                                            {item.name}
                                            {item.hasDropdown && (
                                                <ChevronDown className="dropdown-icon" />
                                            )}
                                        </a>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className="nav-link"
                                        >
                                            {item.name}
                                            {item.hasDropdown && (
                                                <ChevronDown className="dropdown-icon" />
                                            )}
                                        </Link>
                                    )}
                                    {item.hasDropdown && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-content">
                                                <button className="dropdown-item">Option 1</button>
                                                <button className="dropdown-item">Option 2</button>
                                                <button className="dropdown-item">Option 3</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </nav>

                    {/* الأيقونات والإجراءات */}
                    <div className="header-actions">
                        <button className="icon-button">
                            <Search className="icon" />
                        </button>

                        {/* الإشعارات */}
                        <button className="icon-button notification-button">
                            <Bell className="icon" />
                            <span className="badge">5</span>
                        </button>

                        {/* زر تبديل السمة */}
                        <button
                            onClick={toggleTheme}
                            className="icon-button theme-button"
                            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDarkMode ? <Sun className="icon" /> : <Moon className="icon" />}
                        </button>

                        {/* حساب المستخدم مع القائمة المنسدلة */}
                        <div className="user-menu">
                            <button
                                onClick={toggleUserMenu}
                                className="icon-button"
                                aria-label="User menu"
                                aria-expanded={isUserMenuOpen}
                            >
                                <User className="icon" />
                            </button>

                            {isUserMenuOpen && (
                                <div className="user-dropdown">
                                    <div className="dropdown-content">
                                        <button className="user-dropdown-item" onClick={goToProfile}>
                                            <User className="dropdown-item-icon" />
                                            Profile
                                        </button>
                                        <button className="user-dropdown-item logout-dropdown-item">
                                            <LogOut className="dropdown-item-icon" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* زر القائمة للجوال */}
                    <div className="mobile-menu-button">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="mobile-button"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="icon" /> : <Menu className="icon" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* التنقل للجوال */}
            <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
                <div className="mobile-nav-content">
                    {navItems.map((item) => (
                        item.href.startsWith('#') ? (
                            <a
                                key={item.name}
                                href={item.href}
                                className="mobile-nav-item"
                                onClick={closeMobileMenu}
                            >
                                {item.name}
                            </a>
                        ) : (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="mobile-nav-item"
                                onClick={closeMobileMenu}
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                    <div className="mobile-actions">
                        <button className="icon-button">
                            <Search className="icon" />
                        </button>
                        <button className="icon-button notification-button">
                            <Bell className="icon" />
                            <span className="badge">5</span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="icon-button theme-button"
                        >
                            {isDarkMode ? <Sun className="icon" /> : <Moon className="icon" />}
                        </button>
                    </div>

                    {/* خيارات المستخدم للجوال */}
                    <div className="mobile-buttons">
                        <button className="mobile-user-button" onClick={goToProfile}>
                            <User className="button-icon" />
                            <span>Profile</span>
                        </button>
                        <button className="mobile-logout-button">
                            <LogOut className="button-icon" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;