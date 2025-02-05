import React, { useState } from 'react';
import supabase from '../supabaseClient'; // Import your Supabase client

function WorkExperience({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data); // Store edited data

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const { error } = await supabase
        .from('cv_data')
        .update({ work_experience: editedData }) // Update with edited data
        .eq('id', data.id); // Assuming 'id' is the row ID

      if (error) {
        throw error; // Re-throw error to be caught
      }

      setIsEditing(false); // Exit edit mode on successful save
    } catch (error) {
      console.error('Error updating work experience:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...editedData];
    newData[index][field] = value;
    setEditedData(newData);
  };

  return (
    <div>
      <h2>Work Experience</h2>
      {editedData.map((item, index) => (
        <div key={index}> {/* Use a better key if available */}
          {isEditing ? (
            <div>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              />
              {/* Add input fields for other fields (company, dates, etc.) */}
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div onClick={handleEditClick}>
              <h3>{item.title}</h3>
              {/* Display other fields (company, dates, etc.) */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default WorkExperience;