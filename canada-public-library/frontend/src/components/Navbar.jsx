import React, { useState, useEffect } from 'react';
import { BookOpen, Moon, Sun, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Smooth navigation handler
    const handleNavClick = (e, path) => {
        setIsMobileMenuOpen(false);
        if (location.pathname === path) {
            e.preventDefault(); // Prevent react-router from remounting or jumping
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    useEffect(() => {
        const savedTheme = localStorage.getItem('library-theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('library-theme', newTheme);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="nav-brand" onClick={(e) => handleNavClick(e, '/')} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', zIndex: 1000 }}>
                <BookOpen size={isScrolled ? 26 : 32} style={{ transition: 'all 0.3s ease' }} />
                Canada Public Library
            </Link>

            <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            <div className={`nav-actions ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                <div className="nav-links">
                    <Link to="/" onClick={(e) => handleNavClick(e, '/')}>Home</Link>
                    <Link to="/catalog" onClick={(e) => handleNavClick(e, '/catalog')}>Catalog</Link>
                    <Link to="/events" onClick={(e) => handleNavClick(e, '/events')}>Events</Link>
                    <Link to="/about" onClick={(e) => handleNavClick(e, '/about')}>About</Link>
                </div>

                <div className="nav-buttons-group">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <Link
                        to="/login"
                        className="nav-button"
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={(e) => handleNavClick(e, '/login')}
                    >
                        Member Login
                    </Link>

                    <div className="btn-3d">
                        <div className="btn-3d-inner">
                            <div className="btn-3d-front" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                Developer
                            </div>
                            <a href="https://www.linkedin.com/in/anurag-sharma-82b746220/" target="_blank" rel="noopener noreferrer" className="btn-3d-back" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
