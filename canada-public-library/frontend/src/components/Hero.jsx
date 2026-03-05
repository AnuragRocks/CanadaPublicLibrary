import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';

const bookSets = [
    {
        id: 1,
        images: [
            "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg", // The Great Gatsby
            "https://covers.openlibrary.org/b/isbn/9780060935467-L.jpg", // To Kill a Mockingbird
            "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", // 1984
            "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg", // Pride and Prejudice
            "https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg"  // Catcher in the Rye
        ]
    },
    {
        id: 2,
        images: [
            "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg", // Harry Potter 1
            "https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg", // The Hobbit
            "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg", // Dune
            "https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg", // Lord of the Rings
            "https://covers.openlibrary.org/b/isbn/9780812550702-L.jpg"  // Ender's Game
        ]
    },
    {
        id: 3,
        images: [
            "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", // Atomic Habits
            "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg", // The Alchemist
            "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", // Sapiens
            "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg", // Educated
            "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg"  // Ikigai
        ]
    }
];

const Hero = () => {
    const [currentSetIndex, setCurrentSetIndex] = useState(0);

    // Automatically cycle through image sets every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSetIndex((prev) => (prev + 1) % bookSets.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const currentSet = bookSets[currentSetIndex];

    return (
        <section className="hero-section" id="home">
            <div className="hero-content">
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Discover Your Next <span>Great Adventure</span>
                </motion.h1>
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    "A library is not a luxury but one of the necessities of life."
                    <br /><span style={{ fontSize: '1rem', fontStyle: 'normal' }}>— Henry Ward Beecher</span>
                </motion.p>
                <motion.p
                    style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Welcome to the <Link to="/" style={{ color: 'var(--accent-color)', fontWeight: 'bold', textDecoration: 'none' }}>Canada Public Library</Link>. Explore thousands of classic and modern books, find tranquil spaces to study, and expand your horizons.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Link
                        to="/catalog"
                        className="nav-button"
                        style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}
                    >
                        Explore Collection
                    </Link>
                </motion.div>
            </div>

            <div className="hero-images">
                <AnimatePresence mode="popLayout">
                    {/* Outer Left (Img 4) */}
                    <motion.img
                        key={`${currentSet.id}-img4`}
                        src={currentSet.images[4]}
                        alt="Book Cover Outer Left"
                        className="hero-img hero-img-4 float-animation-delayed"
                        initial={{ opacity: 0, scale: 0.5, x: -100, rotate: -40 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: -20 }}
                        exit={{ opacity: 0, scale: 0.5, x: -150, rotate: -60 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    />

                    {/* Inner Left (Img 2) */}
                    <motion.img
                        key={`${currentSet.id}-img2`}
                        src={currentSet.images[1]}
                        alt="Book Cover Inner Left"
                        className="hero-img hero-img-2 float-animation"
                        initial={{ opacity: 0, scale: 0.5, x: -80, rotate: -25 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: -10 }}
                        exit={{ opacity: 0, scale: 0.6, x: -120, rotate: -35 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    />

                    {/* Center (Img 1) */}
                    <motion.img
                        key={`${currentSet.id}-img1`}
                        src={currentSet.images[0]}
                        alt="Book Cover Center Main"
                        className="hero-img hero-img-1"
                        initial={{ opacity: 0, scale: 0.5, y: -50 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -80 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ animation: 'float 5s ease-in-out infinite 1s' }}
                    />

                    {/* Inner Right (Img 3) */}
                    <motion.img
                        key={`${currentSet.id}-img3`}
                        src={currentSet.images[2]}
                        alt="Book Cover Inner Right"
                        className="hero-img hero-img-3 float-animation"
                        initial={{ opacity: 0, scale: 0.5, x: 80, rotate: 25 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 10 }}
                        exit={{ opacity: 0, scale: 0.6, x: 120, rotate: 35 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    />

                    {/* Outer Right (Img 5) */}
                    <motion.img
                        key={`${currentSet.id}-img5`}
                        src={currentSet.images[3]}
                        alt="Book Cover Outer Right"
                        className="hero-img hero-img-5 float-animation-delayed"
                        initial={{ opacity: 0, scale: 0.5, x: 100, rotate: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 20 }}
                        exit={{ opacity: 0, scale: 0.5, x: 150, rotate: 60 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Hero;
