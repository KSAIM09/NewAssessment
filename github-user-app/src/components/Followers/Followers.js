import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Followers() {
    const { username } = useParams();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            const followersResponse = await axios.get(`https://api.github.com/users/${username}/followers`);
            setFollowers(followersResponse.data);
        };
        fetchFollowers();
    }, [username]);

    return (
        <div>
            <h1>{username}'s Followers</h1>
            <ul>
                {followers.map(follower => (
                    <li key={follower.id}>
                        <Link to={`/repos/${follower.login}`}>{follower.login}</Link>
                    </li>
                ))}
            </ul>
            <Link to={`/repos/${username}`}>Back to Repositories</Link>
        </div>
    );
}

export default Followers;
