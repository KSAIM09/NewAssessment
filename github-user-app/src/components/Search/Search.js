import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/repos/${username}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default Search;
