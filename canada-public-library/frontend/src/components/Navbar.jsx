import React, { useState, useEffect } from 'react';
import { BookOpen, Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const [theme, setTheme] = useState('light');

    // Load initial theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('library-theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('library-theme', newTheme);
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <BookOpen size={32} />
                Canada Public Library
            </div>

            <div className="nav-actions">
                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#catalog">Catalog</a>
                    <a href="#about">About</a>
                </div>

                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                    title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <button
                    className="nav-button"
                    onClick={() => alert("Member Portal is currently undergoing scheduled maintenance. Please check back later.")}
                >
                    Member Login
                </button>

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
        </nav>
    );
};

export default Navbar;
