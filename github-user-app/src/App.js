import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search/Search';
import Repositories from './components/Repositories/Repositories';
import RepositoryDetails from './components/RepositoryDetails/RepositoryDetails';
import Followers from './components/Followers/Followers';
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/repos/:username" element={<Repositories />} />
                <Route path="/repo/:username/:repoName" element={<RepositoryDetails />} />
                <Route path="/followers/:username" element={<Followers />} />
            </Routes>
        </Router>
    );
}

export default App;
