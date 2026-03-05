import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, UserPlus, Library } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        try {
            const endpoint = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
            const payload = isRegister ? { fullName, email, password } : { email, password };

            const res = await axios.post(endpoint, payload);

            if (res.data.success) {
                // Save basic user info for display needs
                localStorage.setItem('library-user', JSON.stringify(res.data.user));

                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    navigate('/'); // Smooth redirect to Home!
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Ensure top
                }, 2000);
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.error || "Registration error. Please check your credentials and try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            {/* Animated background shapes specifically for the login page */}
            <div className="login-bg-shapes">
                <motion.div
                    className="shape shape-1 float-animation"
                    animate={{ rotate: 360 }}
                    transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                />
                <motion.div
                    className="shape shape-2 float-animation-delayed"
                    animate={{ rotate: -360 }}
                    transition={{ ease: "linear", duration: 50, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="login-container glass-panel"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="login-header">
                    <motion.div
                        className="login-icon-wrapper"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Library size={40} className="login-icon" />
                    </motion.div>
                    <h2>{isRegister ? 'Join the Library' : 'Welcome Back'}</h2>
                    <p>{isRegister ? 'Unlock a universe of knowledge.' : 'Access your digital library universe.'}</p>
                </div>

                {errorMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="login-error-msg"
                        style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem', borderRadius: '12px' }}
                    >
                        {errorMsg}
                    </motion.div>
                )}

                {isSuccess ? (
                    <motion.div
                        className="login-success-view"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="success-circle">
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </motion.svg>
                        </div>
                        <h3>Authentication Successful!</h3>
                        <p>Redirecting you to your portal...</p>
                    </motion.div>
                ) : (
                    <form className="login-form" onSubmit={handleSubmit}>
                        {isRegister && (
                            <motion.div
                                className="form-group-login"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <label>Full Name</label>
                                <div className="input-with-icon">
                                    <UserPlus size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="Jane Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required={isRegister}
                                    />
                                </div>
                            </motion.div>
                        )}
                        <div className="form-group-login">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="reader@canada.ca"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-login">
                            <label>Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {!isRegister && (
                            <div className="forgot-password">
                                <a href="#forgot">Forgot your password?</a>
                            </div>
                        )}

                        <motion.button
                            type="submit"
                            className="login-submit-btn"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLoading ? (
                                <span className="loader"></span>
                            ) : (
                                <>
                                    {isRegister ? 'Create Account' : 'Sign In'}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>

                        <div className="toggle-register">
                            <p>
                                {isRegister ? 'Already a member?' : "Don't have an account?"}{' '}
                                <span
                                    className="toggle-link"
                                    onClick={() => setIsRegister(!isRegister)}
                                >
                                    {isRegister ? 'Sign In' : 'Sign Up'}
                                </span>
                            </p>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Login;
