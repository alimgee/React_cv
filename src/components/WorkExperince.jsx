import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import './WorkExperience.css';

function WorkExperience({ data, cvDataId }) {
    const [isEditing, setIsEditing] = useState(Array(data?.length).fill(false));
    const [editedData, setEditedData] = useState(data || []);

    const handleEditClick = (index) => {
        const newEditStatus = [...isEditing];
        newEditStatus[index] = !newEditStatus[index];
        setIsEditing(newEditStatus);
    };

    const handleSaveClick = async () => {
        try {
            const { error } = await supabase
                .from('cv_data')
                .update({ work_experience: editedData })
                .eq('id', cvDataId);

            if (error) {
                throw error;
            }

            setIsEditing(Array(data?.length).fill(false)); // Reset isEditing after save
        } catch (error) {
            console.error('Error updating work experience:', error);
        }
    };

    const handleInputChange = (index, field, value) => {
        const newData = [...editedData];
        newData[index] = { ...newData[index], [field]: value };
        setEditedData(newData);
    };

    const handleAddWorkExperience = () => {
        setEditedData([...editedData, { title: '', company: '', dates: '', description: '' }]);
        setIsEditing([...isEditing, true]); // Start editing the new item immediately
    };

    const handleDeleteWorkExperience = (index) => {
        const newData = editedData.filter((_, i) => i !== index);
        setEditedData(newData);
        const newEditStatus = isEditing.filter((_, i) => i !== index);
        setIsEditing(newEditStatus);
    };

    return (
        <div className="work-experience-section">
            <h2>Work Experience</h2>
            {editedData.length === 0 ? (
                <p className="no-data-message">No work experience data yet.</p>
            ) : (
                editedData.map((item, index) => (
                    <Card key={item.id || index} className="mb-3 work-experience-item">
                        <Card.Body>
                            {isEditing[index] ? (
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" value={item.title || ''} onChange={(e) => handleInputChange(index, 'title', e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Company</Form.Label>
                                                <Form.Control type="text" value={item.company || ''} onChange={(e) => handleInputChange(index, 'company', e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Dates</Form.Label>
                                                <Form.Control type="text" value={item.dates || ''} onChange={(e) => handleInputChange(index, 'dates', e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={item.description || ''} onChange={(e) => handleInputChange(index, 'description', e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="primary" onClick={handleSaveClick} className="me-2">Save</Button>
                                        <Button variant="secondary" onClick={() => handleEditClick(index)}>Cancel</Button>
                                        <Button variant="danger" onClick={() => handleDeleteWorkExperience(index)} className="ms-2">Delete</Button>
                                    </div>
                                </Form>
                            ) : (
                                <div onClick={() => handleEditClick(index)}>
                                    <Row>
                                        <Col md={9}><h3 className="work-experience-title">{item.title}</h3></Col>
                                        <Col md={3}><p className="work-experience-dates">{item.dates}</p></Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}><p className="work-experience-company">{item.company}</p></Col>
                                    </Row>
                                    <p>{item.description}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                ))
            )}
            <div className="d-flex justify-content-center">
                <Button variant="success" onClick={handleAddWorkExperience} className="mt-3">Add Work Experience</Button>
            </div>
        </div>
    );
}

export default WorkExperience;