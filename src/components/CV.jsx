import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import WorkExperience from './WorkExperince';
import Education from './Education';
import Hobbies from './Hobbies';
import VoluntaryWork from './VoluntaryWork';

function CV({ session, user }) {
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                        console.error("Supabase query error:", error); 
                    } else if (data && data.length > 0) {
                        setCvData(data[0]);
                        console.log("CV Data fetched:", data[0]);
                    } else {
                        console.log('No CV data found for this user. Creating a new entry with default data...');

                        const defaultCVData = {
                            work_experience: [],
                            education: [],
                            voluntary_work: [],
                            hobbies: [],
                            references: "",
                        };

                        supabase
                            .from('cv_data')
                            .insert([{ user_id: session.user.id, ...defaultCVData }])
                            .then(({ data, error }) => {
                                if (data) setCvData(data[0]);
                                if (error) setError(error);
                            });
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [session, user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!cvData) return <div>No data yet.</div>;

    return (
        <div>
            {user && (
                <div>
                    <p>Welcome, {user.email}!</p>
                </div>
            )}
            <WorkExperience data={cvData.work_experience} cvDataId={cvData.id} />
            <Education data={cvData.education} cvDataId={cvData.id} />
            <VoluntaryWork data={cvData.voluntary_work} cvDataId={cvData.id} />
            <Hobbies data={cvData.hobbies} cvDataId={cvData.id} />
        </div>
    );
}

export default CV;