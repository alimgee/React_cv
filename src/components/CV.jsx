import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import WorkExperience from './WorkExperince';
import Education from './Education';
import VoluntaryWork from './VoluntaryWork';
import Hobbies from './Hobbies';
import supabase from '../supabaseClient'; // Import your Supabase client

function CV({ user }) { // Receive the user object as a prop
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCVData() {
            setLoading(true); // Set loading to true before fetching

            try {
                if (!user || !user.id) { // Handle cases where user or user.id is missing
                    console.warn("User or user ID is missing. Cannot fetch CV data.");
                    setLoading(false);
                    return; // Stop fetching if user info is missing.
                }

                const { data, error } = await supabase
                    .from('cv_data')
                    .select('*')
                    .eq('user_id', user.id);

                if (error) {
                    setError(error);
                    console.error("Error fetching CV data:", error);
                } else if (data && data.length > 0) {
                    setCvData(data[0]);
                } else {
                    console.log('No CV data found for this user.');
                    // Handle the case where no CV data exists (e.g., show a message or create default data)
                    // For example, you can set default cvData:
                    // setCvData({ work_experience: [], education: [], voluntary_work: [], hobbies: [] });
                }
            } catch (err) {
                setError(err);
                console.error("Error in fetchCVData:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCVData(); // Call the fetch function
    }, [user]); // The effect depends on the user object



    return (
        <Container>
            {loading ? (
                <p>Loading CV data...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : cvData ? ( // Check if cvData is loaded (not null)
                <> {/* Fragment to wrap multiple elements */}
                    <Row>
                        <Col md={12}>
                            <div className="work-experience-section">
                                <h2>Work Experience</h2>
                                <WorkExperience data={cvData.work_experience} cvDataId={cvData.id} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="education-section">
                                <h2>Education</h2>
                                <Education data={cvData.education} cvDataId={cvData.id} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="voluntary-work-section">
                                <h2>Voluntary Work</h2>
                                <VoluntaryWork data={cvData.voluntary_work} cvDataId={cvData.id} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="hobbies-section">
                                <h2>Hobbies</h2>
                                <Hobbies data={cvData.hobbies} cvDataId={cvData.id} />
                            </div>
                        </Col>
                    </Row>
                </>
            ) : (
                <p>No CV data found. Please add your information.</p>
            )}
        </Container>
    );
}

export default CV;