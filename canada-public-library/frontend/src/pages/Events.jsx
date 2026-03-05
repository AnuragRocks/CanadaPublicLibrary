import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ExternalLink, MapPin } from 'lucide-react';
import axios from 'axios';

const Events = () => {
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!location) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const res = await axios.post('http://localhost:5000/api/events', { location });
            if (res.data.error) {
                setError(res.data.error);
            } else {
                setData(res.data);
            }
        } catch (err) {
            setError("Could not reach server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section style={{ padding: '8rem 5%', minHeight: '80vh', position: 'relative', zIndex: 10 }}>
            <motion.div
                className="search-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
            >
                <h2>Upcoming Reading Events</h2>
                <p style={{ margin: '1rem 0', color: 'var(--text-secondary)' }}>Find exciting literary discussions, author meet & greets, and events globally or locally!</p>

                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <motion.div
                        className="input-group"
                        style={{ flex: '1', minWidth: '280px', position: 'relative' }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <motion.input
                            type="text"
                            placeholder="Enter your town, city, or general location..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '1.2rem 1.8rem',
                                fontSize: '1.05rem',
                                borderRadius: '50px',
                                border: '2px solid rgba(255, 107, 53, 0.1)',
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                                outline: 'none',
                                color: 'var(--text-primary)',
                                transition: 'all 0.3s ease'
                            }}
                            whileFocus={{
                                border: '2px solid var(--accent-color)',
                                boxShadow: '0 12px 40px rgba(255, 107, 53, 0.15)',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)'
                            }}
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '0 2.5rem',
                            minHeight: '60px',
                            borderRadius: '50px',
                            background: 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '1.05rem',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            minWidth: '200px'
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 15px 35px rgba(255, 107, 53, 0.45)',
                            backgroundImage: 'linear-gradient(135deg, var(--accent-hover), #ff9e7d)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                        {loading ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                                <Loader2 size={24} />
                            </motion.div>
                        ) : 'Discover Events ✨'}
                    </motion.button>
                </form>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: 'red', marginTop: '2rem', padding: '1rem', background: '#fee2e2', borderRadius: '8px' }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {data && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginTop: '3rem', textAlign: 'left' }}
                        >
                            <h3 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{data.message}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} /> Data calculated relative to centroid: {data.locationOriginLabel}
                            </p>

                            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                                {data.events.map((ev, idx) => (
                                    <div key={idx} className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{ev.title}</h3>
                                        <p style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{ev.date}</p>
                                        <p style={{ margin: '1rem 0', color: 'var(--text-secondary)' }}>{ev.description}</p>
                                        <a
                                            href={ev.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#0ea5e9', fontWeight: 'bold' }}
                                        >
                                            View Event Info <ExternalLink size={16} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Events;
