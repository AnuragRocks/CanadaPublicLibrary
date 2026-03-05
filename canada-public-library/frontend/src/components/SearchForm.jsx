import React, { useState } from 'react';
import axios from 'axios';
import { Search, Loader2, ExternalLink, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        location: '',
        option: 'Read Online'
    });
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [authorTree, setAuthorTree] = useState([]);
    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionTimer, setSuggestionTimer] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'title' || name === 'author') {
            const query = name === 'title' ? value : formData.title;
            if (query.length >= 2) {
                if (suggestionTimer) clearTimeout(suggestionTimer);
                const timer = setTimeout(async () => {
                    try {
                        const res = await axios.get(`http://localhost:5000/api/suggestions?q=${encodeURIComponent(query)}`);
                        setSuggestions(res.data);
                        setShowSuggestions(true);
                    } catch (err) {
                        console.error("Suggestions err", err);
                    }
                }, 500);
                setSuggestionTimer(timer);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setFormData({ ...formData, title: suggestion.title, author: suggestion.author });
        setShowSuggestions(false);
    };

    const executeSearch = async (excludeUrl = null) => {
        setLoading(true);
        setFeedbackGiven(false);
        try {
            const payload = { ...formData, excludeUrl };
            // Replace with your local backend address! (e.g. http://localhost:5000/api/search)
            const res = await axios.post('http://localhost:5000/api/search', payload);
            setResults(res.data.result);
            setAuthorTree(res.data.authorTree);
        } catch (err) {
            console.error(err);
            // Fallback UI for display if backend fails
            setResults({
                title: formData.title,
                author: formData.author,
                error: "Failed to connect to backend server. Make sure node index.js is running!"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        executeSearch();
    };

    const handleFeedback = async (isUseful) => {
        if (!results.onlineLink) return;
        setFeedbackGiven(true);

        try {
            await axios.post('http://localhost:5000/api/feedback', {
                title: results.title,
                author: results.author,
                url: results.onlineLink,
                isUseful
            });

            if (!isUseful) {
                // Automatically search again excluding this URL to find a better one
                setTimeout(() => {
                    setResults(null);
                    executeSearch(results.onlineLink);
                }, 1500);
            }
        } catch (error) {
            console.error("Feedback error", error);
        }
    };

    return (
        <section className="search-form-section" id="catalog">
            <motion.div
                className="search-container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="search-header">
                    <h2>Find Your Next Read</h2>
                    <p>Search our extensive database or check local availability across Canada.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group" style={{ position: 'relative' }}>
                            <label className="form-label" htmlFor="title">Name of the book</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-input"
                                placeholder="e.g. Rich Dad Poor Dad"
                                value={formData.title}
                                onChange={handleChange}
                                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                autoComplete="off"
                                required
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {suggestions.map((s, idx) => (
                                        <li key={idx} onClick={() => handleSuggestionClick(s)}>
                                            <span style={{ fontWeight: '500' }}>{s.title}</span> <span style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>by {s.author}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="author">Author of the book</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                className="form-input"
                                placeholder="e.g. Robert Kiyosaki"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="option">How would you like to read it?</label>
                            <select
                                id="option"
                                name="option"
                                className="form-select"
                                value={formData.option}
                                onChange={handleChange}
                            >
                                <option value="Read Online">Read the book online</option>
                                <option value="Purchase Online">Purchase the book online</option>
                                <option value="Nearby Location">Location of libraries nearby</option>
                            </select>
                        </div>

                        {formData.option === "Nearby Location" && (
                            <div className="form-group">
                                <label className="form-label" htmlFor="location">Your Location (City/PC)</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="form-input"
                                    placeholder="e.g. Toronto, ON"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        className="submit-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Search />}
                        {loading ? 'Searching Database...' : 'Search Now'}
                    </motion.button>
                </form>

                <AnimatePresence>
                    {results && !loading && (
                        <motion.div
                            className="search-results dynamic-results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {results.error ? (
                                <div style={{ color: 'red', textAlign: 'center' }}>
                                    <AlertCircle size={40} style={{ margin: '0 auto', marginBottom: '1rem' }} />
                                    <p>{results.error}</p>
                                </div>
                            ) : (
                                <div className="result-layout">
                                    <div className="result-cover">
                                        {results.coverImage ? (
                                            <img src={results.coverImage} alt={results.title} className="book-cover-img glass-panel" />
                                        ) : (
                                            <div className="placeholder-cover">No Cover Available</div>
                                        )}
                                    </div>

                                    <div className="result-details">
                                        <h3 className="result-title">{results.title}</h3>
                                        <p className="result-author">By <strong>{results.author}</strong></p>

                                        {results.description && (
                                            <p className="result-desc">
                                                {results.description.length > 200
                                                    ? results.description.substring(0, 200) + '...'
                                                    : results.description}
                                            </p>
                                        )}

                                        <div className="result-actions">
                                            {results.requestedOption === 'Purchase Online' ? (
                                                <div className="success-action-area">
                                                    <p style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                                        ✓ Ready to purchase!
                                                    </p>
                                                    <a href={`https://www.amazon.ca/s?k=${encodeURIComponent(results.title + ' ' + results.author)}`} target="_blank" rel="noreferrer" className="primary-link-btn">
                                                        Purchase Hardcopy on Amazon <ExternalLink size={18} />
                                                    </a>
                                                </div>
                                            ) : results.requestedOption === 'Nearby Location' ? (
                                                <div className="success-action-area">
                                                    <p style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                                        📍 Found in local libraries!
                                                    </p>
                                                    <div className="alternatives-box">
                                                        <h4>Available Inventory Locations near {formData.location ? formData.location : 'you'}:</h4>
                                                        <ul className="real-time-locations">
                                                            {results.inventory && results.inventory.map((inv, idx) => (
                                                                <li key={idx} className="library-card glass-panel" style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px', borderLeft: '4px solid #059669' }}>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                        <div style={{ paddingRight: '1rem' }}>
                                                                            <h5 style={{ margin: '0 0 0.2rem 0', color: 'var(--text-primary)', fontSize: '1.05rem' }}>📍 {inv.name}</h5>
                                                                            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{inv.address.split(',').slice(0, 3).join(',')}</p>
                                                                            <span style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                                                                                {inv.status}
                                                                            </span>
                                                                        </div>
                                                                        <div style={{ textAlign: 'right', minWidth: '70px' }}>
                                                                            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{inv.distance} km</p>
                                                                            <a
                                                                                href={inv.mapsLink}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2563eb', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}
                                                                                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                                                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                                                            >
                                                                                Get Directions <ExternalLink size={14} />
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ) : results.onlineLink ? (
                                                <div className="success-action-area">
                                                    <p style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                                        ✓ Found online resource!
                                                        {results.isFromDatabase && " (Verified by community)"}
                                                    </p>
                                                    <a
                                                        href={results.onlineLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="primary-link-btn"
                                                    >
                                                        Read Online Now <ExternalLink size={18} />
                                                    </a>

                                                    <div className="feedback-section glass-panel">
                                                        <p>Was this link useful to you?</p>
                                                        <div className="feedback-buttons">
                                                            <button
                                                                onClick={() => handleFeedback(true)}
                                                                className={`btn-thumb ${feedbackGiven ? 'disabled' : ''}`}
                                                                disabled={feedbackGiven}
                                                                title="Yes, save it!"
                                                            >
                                                                <ThumbsUp size={16} /> Yes
                                                            </button>
                                                            <button
                                                                onClick={() => handleFeedback(false)}
                                                                className={`btn-thumb no-btn ${feedbackGiven ? 'disabled' : ''}`}
                                                                disabled={feedbackGiven}
                                                                title="No, find another source"
                                                            >
                                                                <ThumbsDown size={16} /> No, find another source
                                                            </button>
                                                        </div>
                                                        {feedbackGiven && <span className="feedback-thanks">Thanks for the feedback! {feedbackGiven && !results.onlineLink ? "" : ""}</span>}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="not-found-area">
                                                    <p className="not-found-msg">
                                                        <AlertCircle size={18} /> Oops... The book is not currently available to read online.
                                                    </p>
                                                    <div className="alternatives-box">
                                                        <h4>Alternative Options:</h4>
                                                        <ul>
                                                            <li>📍 Available at: Toronto Central District, Floor 3 (Aisle 12)</li>
                                                            <li>🛍️ <a href={`https://www.amazon.ca/s?k=${encodeURIComponent(results.title + ' ' + results.author)}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Purchase Hardcopy Online</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Author Tree Structure */}
                            {authorTree.length > 0 && (
                                <div className="author-tree-section">
                                    <h3 className="tree-title">Other famous books by {results.author}:</h3>
                                    <div className="tree-container">
                                        <div className="tree-line"></div>
                                        {authorTree.map((book, idx) => (
                                            <motion.div
                                                key={book.id}
                                                className="tree-node"
                                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + (idx * 0.1) }}
                                            >
                                                <div className={`node-dot ${idx % 2 === 0 ? 'left' : 'right'}`}></div>
                                                <div className="node-content glass-panel">
                                                    {book.image && <img src={book.image} alt="cover" className="node-thumb" />}
                                                    <div className="node-text">
                                                        <h5>{book.title}</h5>
                                                        <span className="node-year">{book.publishedDate?.substring(0, 4) || "Unknown Year"}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default SearchForm;
