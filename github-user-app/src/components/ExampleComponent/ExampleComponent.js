import React, { useState } from 'react';
import { saveUser, fetchUserDetails, fetchUserFriends } from './apiService';

const ExampleComponent = () => {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [userFriends, setUserFriends] = useState(null);

  const handleSaveUser = async () => {
    try {
      const result = await saveUser(username);
      console.log('User saved:', result);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleFetchUserDetails = async () => {
    try {
      const details = await fetchUserDetails(username);
      setUserDetails(details);
      console.log('User details:', details);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleFetchUserFriends = async () => {
    try {
      const friends = await fetchUserFriends(username);
      setUserFriends(friends);
      console.log('User friends:', friends);
    } catch (error) {
      console.error('Error fetching user friends:', error);
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
