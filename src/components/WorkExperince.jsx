import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { Card, Form, Button } from 'react-bootstrap';

function WorkExperience({ data, cvDataId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data || []);

    const handleEditClick = () => {
        setIsEditing(true);
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

            setIsEditing(false);
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
        setEditedData([...editedData, { title: '', company: '', dates: '', description: '' }]); // Add empty work experience
    };

    const handleDeleteWorkExperience = (index) => {
        const newData = editedData.filter((_, i) => i !== index);
        setEditedData(newData);
    };

    return (
        <div>
            <h2>Work Experience</h2>
            {editedData.map((item, index) => (
                <Card key={item.id || index} className="mb-3">
                    <Card.Body>
                        {isEditing ? (
                            <Form>
                                <Form.Group className="mb-2">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={item.title || ''}
                                        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={item.company || ''}
                                        onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Dates</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={item.dates || ''}
                                        onChange={(e) => handleInputChange(index, 'dates', e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea" // Use textarea for description
                                        rows={3}
                                        value={item.description || ''}
                                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleSaveClick} className="me-2">Save</Button>
                                <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button variant="danger" onClick={() => handleDeleteWorkExperience(index)} className="ms-2">Delete</Button>

                            </Form>
                        ) : (
                            <div onClick={handleEditClick}>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.company} | {item.dates}</Card.Subtitle>
                                <Card.Text>{item.description}</Card.Text>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            ))}
            <Button variant="success" onClick={handleAddWorkExperience}>Add Work Experience</Button>
        </div>
    );
}

export default WorkExperience;