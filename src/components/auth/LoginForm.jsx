import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            }

            console.log(user);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label htmlFor="login-email">Email:</label> {/* Unique ID */}
            <input
                type="email"
                id="login-email" // Unique ID
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="login-password">Password:</label> {/* Unique ID */}
            <input
                type="password"
                id="login-password" // Unique ID
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
            </button>
        </form>
    );
}

export default LoginForm;