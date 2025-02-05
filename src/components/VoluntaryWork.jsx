import React, { useState } from 'react';
import supabase from '../supabaseClient';

function VoluntaryWork({ data, cvDataId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data || []); // Handle null or undefined data

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const { error } = await supabase
                .from('cv_data')
                .update({ voluntary_work: editedData })
                .eq('id', cvDataId);

            if (error) {
                throw error;
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating voluntary work:', error);
        }
    };

    const handleInputChange = (index, field, value) => {
        const newData = [...editedData];
        newData[index] = { ...newData[index], [field]: value }; // Correct way to update nested state
        setEditedData(newData);
    };

    return (
        <div>
            <h2>Voluntary Work</h2>
            {editedData && editedData.length > 0 ? ( // Conditional rendering check
                editedData.map((item, index) => (
                    <div key={item.id || index}> {/* Use item.id if available, otherwise index */}
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={item.title || ''}
                                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={item.organization || ''}
                                    onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                                />
                                {/* Add other input fields as needed (e.g., dates, description) */}
                                <button onClick={handleSaveClick}>Save</button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        ) : (
                            <div onClick={handleEditClick}>
                                <h3>{item.title}</h3>
                                <p>{item.organization}</p>
                                {/* Display other fields as needed */}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No voluntary work data yet.</p> // Message when no data
            )}
        </div>
    );
}

export default VoluntaryWork;