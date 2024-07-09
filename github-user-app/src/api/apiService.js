import React, { useState } from 'react';
import { saveUser, fetchUserDetails, fetchUserFriends } from '../api/apiService';

const ExampleComponent = () => {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [userFriends, setUserFriends] = useState(null);

  const handleSaveUser = async () => {
    try {
      const result = await saveUser(username);
      console.log('User saved:', result);
      // Optionally update state or perform other actions based on API response
    } catch (error) {
      console.error('Error saving user:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleFetchUserDetails = async () => {
    try {
      const details = await fetchUserDetails(username);
      setUserDetails(details);
      console.log('User details:', details);
      // Optionally update state or perform other actions based on API response
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleFetchUserFriends = async () => {
    try {
      const friends = await fetchUserFriends(username);
      setUserFriends(friends);
      console.log('User friends:', friends);
      // Optionally update state or perform other actions based on API response
    } catch (error) {
      console.error('Error fetching user friends:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSaveUser}>Save User</button>
      <button onClick={handleFetchUserDetails}>Fetch User Details</button>
      <button onClick={handleFetchUserFriends}>Fetch User Friends</button>

      {userDetails && (
        <div>
          <h3>User Details:</h3>
          <pre>{JSON.stringify(userDetails, null, 2)}</pre>
        </div>
      )}

      {userFriends && (
        <div>
          <h3>User Friends:</h3>
          <pre>{JSON.stringify(userFriends, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExampleComponent;
