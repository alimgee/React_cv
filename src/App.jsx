import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import CV from './components/CV';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import { SessionContextProvider, useUser } from '@supabase/auth-helpers-react';
import './App.css';


function App() {
    const [session, setSession] = useState(null);
    const user = useUser();
    const [activeTab, setActiveTab] = useState('login');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    console.log("Current session:", session); // Debug
    console.log("Current user:", user); // Debug
    return (

        <div className="App cv-container">
            {!user ? (
                <div>
                    <div>
                        <button
                            className={activeTab === 'login' ? 'active' : ''}
                            onClick={() => setActiveTab('login')}
                        >
                            Log In
                        </button>
                        <button
                            className={activeTab === 'signup' ? 'active' : ''}
                            onClick={() => setActiveTab('signup')}
                        >
                            Sign Up
                        </button>
                    </div>

                    {activeTab === 'login' ? (
                        <LoginForm />
                    ) : (
                        <SignUpForm />
                    )}
                </div>
            ) : (
                <CV session={session} user={user} />
            )}
        </div>
 
    );
}

export default App;