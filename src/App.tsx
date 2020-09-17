import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import { fetchRepos, fetchGHProfile } from './api';
import { GHRepoType } from './types/GHRepoType';
import { GHProfileType } from './types/GHProfileType';
import ContentCard from './components/ContentCard';

import './App.css';

const Repos = (repos: GHRepoType[], avatarUrl: string) => repos.map((repo: GHRepoType) => 
  <ContentCard 
    title={ repo.name } 
    description={ repo.description } 
    titleUrl={ repo.htmlUrl } 
    avatarUrl={ avatarUrl }
    loading={ false } />
);

const App: React.FC = () => {
  const [repos, setGHrepos] = useState<GHRepoType[]>();
  const [ghProfile, setGHProfile] = useState<GHProfileType>();

  useEffect(() => {
    fetchRepos().then(res => {
      setGHrepos(res);
      console.log(res);
    });
    fetchGHProfile().then(res => {
      setGHProfile(res);
      console.log(res);
    });
    
  }, []);

  return <div className="App">
    <Button type="primary">Button</Button>
    {repos && ghProfile  
      ? Repos(repos, ghProfile.avatarUrl)
      : <ContentCard loading={ true } />
    }
    
  </div>
};


export default App;
