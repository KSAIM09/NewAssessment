import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Repositories() {
    const { username } = useParams();
    const [repos, setRepos] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userResponse = await axios.get(`https://api.github.com/users/${username}`);
            const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
            setUser(userResponse.data);
            setRepos(reposResponse.data);
        };
        fetchData();
    }, [username]);

    return (
        <div>
            {user && (
                <div>
                    <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
                    <h1>{user.login}</h1>
                    <p>{user.bio}</p>
                    <Link to={`/followers/${username}`}>Followers</Link>
                </div>
            )}
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <Link to={`/repo/${username}/${repo.name}`}>{repo.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Repositories;
