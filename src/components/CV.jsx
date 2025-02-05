import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient'; // Import your Supabase client

function CV() {
  const [cvData, setCvData] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Session:', session);
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      setLoading(true);
      supabase
        .from('cv_data')
        .select('*')
        .eq('user_id', session.user.id)
        .then(({ data, error }) => {
          if (error) {
            setError(error);
          } else if (data && data.length > 0) {
            setCvData(data[0]);
          } else {
            // Handle the case where no data exists for the user yet
            // You might want to create a default entry in the database
            console.log('No CV data found for this user. Creating a new entry...');
            supabase
              .from('cv_data')
              .insert([{ user_id: session.user.id }]) // Create a default entry
              .then(({ data, error }) => {
                if (data) setCvData(data[0]);
                if (error) setError(error);
              });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!cvData) return <div>No data yet.</div>; // Handle no data case

  return (
    <div>
      {/* Display your CV sections here, passing data as props */}
      <pre>{JSON.stringify(cvData, null, 2)}</pre> {/* Temporary: Display data */}
    </div>
  );
}

export default CV;