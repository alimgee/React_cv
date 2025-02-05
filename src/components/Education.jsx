import React, { useState } from 'react';
import supabase from '../supabaseClient';

function Education({ data, cvDataId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data || []); // Handle potential null data

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const { error } = await supabase
                .from('cv_data')
                .update({ education: editedData })
                .eq('id', cvDataId);

            if (error) {
                throw error;
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating education:', error);
        }
    };

    const handleInputChange = (index, field, value) => {
        const newData = [...editedData];
        newData[index] = { ...newData[index], [field]: value };
        setEditedData(newData);
    };

    return (
        <div>
            <h2>Education</h2>
            {editedData && editedData.length > 0 ? ( // Check if data exists and is not empty
                editedData.map((item, index) => (
                    <div key={item.id || index}> {/* Use item.id if available, otherwise index */}
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={item.degree || ''}
                                    onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={item.university || ''}
                                    onChange={(e) => handleInputChange(index, 'university', e.target.value)}
                                />
                                <button onClick={handleSaveClick}>Save</button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        ) : (
                            <div onClick={handleEditClick}>
                                <h3>{item.degree}</h3>
                                <p>{item.university}</p>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No education data yet.</p> // Display a message if no data
            )}
        </div>
    );
}

export default Education;