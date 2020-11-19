import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';

import { fetchRepos, fetchGHProfile } from './api';
import { GHRepoType } from './types/GHRepoType';
import { GHProfileType } from './types/GHProfileType';
import ContentCard from './components/ContentCard';

import './App.css';

const { Header, Footer, Content } = Layout;

const RepoCols = (repos: GHRepoType[], avatarUrl: string) => repos.map((repo: GHRepoType) =>
  <ContentCard
    title={repo.name}
    description={repo.description}
    titleUrl={repo.htmlUrl}
    avatarUrl={avatarUrl}
    loading={false} />
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
    <Layout>
      <Header>Avery Kushner</Header>
      <Content style={{ padding: '50px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {repos && ghProfile
          ? RepoCols(repos, ghProfile.avatarUrl)
          : <ContentCard loading={true} />
        }
      </Content>
      <Footer style={{ position: 'fixed', left: 0, bottom: 0, width: '100%' }}><a href='https://www.linkedin.com/in/avery-kushner-194b39116/'>LinkedIn</a></Footer>
    </Layout>
  </div>
};


export default App;
