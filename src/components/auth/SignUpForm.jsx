import React, { useState } from 'react';
import supabase from '../../supabaseClient';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label htmlFor="signup-email">Email:</label> {/* Unique ID */}
            <input
                type="email"
                id="signup-email" // Unique ID
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="signup-password">Password:</label> {/* Unique ID */}
            <input
                type="password"
                id="signup-password" // Unique ID
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
    );
}

export default SignUpForm;