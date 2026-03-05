import React from 'react';
import { BookOpen, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="footer-content">
                <div className="footer-brand" style={{ flex: '1 1 300px' }}>
                    <h3><BookOpen size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />Canada Public Library</h3>
                    <p>Inspiring minds, fostering community, and providing access to knowledge across Canada. Your journey begins here.</p>
                </div>

                <div className="footer-links-group" style={{ flex: '1 1 200px' }}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#catalog">Catalog Search</a></li>
                        <li><a href="#events">Reading Events</a></li>
                        <li><a href="#about">About Us</a></li>
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
                <p>&copy; {new Date().getFullYear()} Canada Public Library. All rights reserved.</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    Designed and Developed by <span className="developer-name">Anurag sharma</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
