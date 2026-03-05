import React from 'react';
import { BookOpen, MapPin, Mail, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    const handleNavClick = (e, path) => {
        if (location.pathname === path) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Allow standard navigation, but jump to top for next page instantly to prevent scroll retention
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer" id="contact">
            <div className="footer-content">
                <div className="footer-brand" style={{ flex: '1 1 300px' }}>
                    <Link to="/" onClick={(e) => handleNavClick(e, '/')} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                        <h3 style={{ transition: 'color 0.2s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>
                            <BookOpen size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />Canada Public Library
                        </h3>
                    </Link>
                    <p>Inspiring minds, fostering community, and providing access to knowledge across Canada. Your journey begins here.</p>
                </div>

                <div className="footer-links-group" style={{ flex: '1 1 200px' }}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/" onClick={(e) => handleNavClick(e, '/')}>Home</Link></li>
                        <li><Link to="/catalog" onClick={(e) => handleNavClick(e, '/catalog')}>Catalog Search</Link></li>
                        <li><Link to="/events" onClick={(e) => handleNavClick(e, '/events')}>Reading Events</Link></li>
                        <li><Link to="/about" onClick={(e) => handleNavClick(e, '/about')}>About Us</Link></li>
                    </ul>
                </div>

                <div className="footer-links-group" style={{ flex: '1 1 200px' }}>
                    <h4>Contact Us</h4>
                    <ul>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> 123 Knowledge Ave, Toronto, ON</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> +1 (800) 123-4567</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> contact@canadapubliclibrary.ca</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} <Link to="/" onClick={(e) => handleNavClick(e, '/')} style={{ color: 'inherit', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>Canada Public Library</Link>. All rights reserved.</p>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                        Designed and Developed by <span className="developer-name" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Anurag sharma</span>
                    </p>
                    <a
                        href="https://www.linkedin.com/in/anurag-sharma"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'rgba(255, 255, 255, 0.9)',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            transition: 'all 0.3s ease',
                            padding: '6px 12px',
                            marginTop: '4px',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            background: 'rgba(255, 255, 255, 0.05)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.borderColor = 'var(--accent-color)';
                            e.currentTarget.style.background = 'var(--accent-color)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                    >
                        Contact the Developer on LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
