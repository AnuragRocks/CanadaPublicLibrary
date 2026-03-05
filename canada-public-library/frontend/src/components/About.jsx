import React from 'react';

const About = () => {
    return (
        <section id="about" className="about-section" style={{ padding: '5rem 5%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>About Our Library</h2>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                    Welcome to the Canada Public Library, the nation's premier destination for knowledge, creativity, and community building.
                    Established in 1912, we have continuously evolved from a modest reading room to an architectural marvel hosting millions of digital and physical resources.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    Our mission is simple: to provide free and equitable access to information, preserve our rich history, and inspire lifelong learning.
                    Whether you are here to explore our classic archives, study in our quiet zones, or attend our community workshops, there's always a place for you.
                </p>
            </div>
        </section>
    );
};

export default About;
