import React from 'react';
import { motion } from 'framer-motion';

const Events = () => {
    return (
        <section style={{ padding: '8rem 5%', minHeight: '80vh', position: 'relative', zIndex: 10 }}>
            <motion.div
                className="search-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
            >
                <h2>Upcoming Reading Events</h2>
                <p style={{ margin: '1rem 0', color: 'var(--text-secondary)' }}>Join our community for exciting literary discussions and events!</p>

                <div style={{ display: 'grid', gap: '2rem', marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
                        <h3>Summer Reading Kickoff</h3>
                        <p style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>June 15th, 2026</p>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Get started on your summer reading list with our kickoff festival. Free books for kids and teens!</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
                        <h3>Author Meet & Greet</h3>
                        <p style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>July 10th, 2026</p>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Meet local Canadian authors, ask questions, and get your favorite books signed in a dedicated event space.</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
                        <h3>Poetry Slam Night</h3>
                        <p style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>August 5th, 2026</p>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Listen to emerging poets share their work in a serene, supportive environment with complimentary refreshments.</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Events;
