import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import grid components
import WorkExperience from './WorkExperince'; // Import your components
import Education from './Education';
import VoluntaryWork from './VoluntaryWork';
import Hobbies from './Hobbies';

function CV({ session, user }) {
    const cvData = { // Replace with your actual data fetching logic
        work_experience: [
            { title: 'test title', company: 'test company', dates: 'dec', description: 'dsfasd afad afd adf adf' }
        ],
        education: [],
        voluntary_work: [],
        hobbies: []
    };

    return (
        <Container> {/* Wrap everything in a Container */}
            <Row> {/* Row for Work Experience */}
                <Col md={12}> {/* Full width for the heading and content */}
                    <div className="work-experience-section">
                        <h2>Work Experience</h2>
                        <WorkExperience data={cvData.work_experience} cvDataId={cvData.id} />
                    </div>
                </Col>
            </Row>
            <Row> {/* Row for Education */}
                <Col md={12}>
                    <div className="education-section">
                        <h2>Education</h2>
                        <Education data={cvData.education} cvDataId={cvData.id} />
                    </div>
                </Col>
            </Row>
            <Row> {/* Row for Voluntary Work */}
                <Col md={12}>
                    <div className="voluntary-work-section">
                        <h2>Voluntary Work</h2>
                        <VoluntaryWork data={cvData.voluntary_work} cvDataId={cvData.id} />
                    </div>
                </Col>
            </Row>
            <Row> {/* Row for Hobbies */}
                <Col md={12}>
                    <div className="hobbies-section">
                        <h2>Hobbies</h2>
                        <Hobbies data={cvData.hobbies} cvDataId={cvData.id} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CV;