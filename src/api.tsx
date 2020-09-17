import { map, pick, filter, flow, includes, assign, get } from 'lodash';

import { GHRepoType } from './types/GHRepoType';
import { GHProfileType } from './types/GHProfileType';


const fetchRepos = async (): Promise<GHRepoType[]> => {
  const res = await fetch('https://api.github.com/users/avesk/repos')
    .then((res) => res.json())
    .catch((err) => console.log(err));
  console.log(res);
  const mapResToRepoType = (res: any): GHRepoType[] => map( res, (repo): GHRepoType => { return { name: get(repo, 'name'), htmlUrl: get(repo, 'html_url'), description: get(repo, 'description') }} );

  const filterRepos = (repos: GHRepoType[]): GHRepoType[] => filter(
    repos, 
    (repo: GHRepoType) => includes(['RSCS', 'react-synth-js', 'echo-synth', 'bot-selection-interface', 'avery-portfolio'], repo.name)
  );
  const stripRepos = (repos: GHRepoType[]): GHRepoType[] => map(
    repos, 
    (repo: GHRepoType): GHRepoType => pick(repo, ['name', 'htmlUrl', 'description'])
  );

  return flow(
    filterRepos,
    // stripRepos,
    mapResToRepoType,
  )(res);
}; 

const fetchGHProfile = async (): Promise<GHProfileType> => {
  const profile = await fetch('https://api.github.com/users/avesk')
    .then((res) => res.json())
    .catch((err) => console.log(err));
  console.log(profile);
  return { avatarUrl: profile.avatar_url, htmlUrl: profile.html_url };
}

export { fetchRepos, fetchGHProfile };
