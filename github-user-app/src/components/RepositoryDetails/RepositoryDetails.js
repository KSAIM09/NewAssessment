import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function RepositoryDetails() {
    const { username, repoName } = useParams();
    const [repo, setRepo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const repoResponse = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
            setRepo(repoResponse.data);
        };
        fetchData();
    }, [username, repoName]);

    return (
        <div>
            {repo && (
                <div>
                    <h1>{repo.name}</h1>
                    <p>{repo.description}</p>
                    <p>{repo.language}</p>
                    <p>{repo.stargazers_count} Stars</p>
                    <p>{repo.forks_count} Forks</p>
                    <p>{repo.open_issues_count} Open Issues</p>
                </div>
            )}
            <Link to={`/repos/${username}`}>Back to Repositories</Link>
        </div>
    );
}

export default RepositoryDetails;
