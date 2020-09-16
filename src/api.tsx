import { map, pick, filter, flow, includes } from 'lodash';

import { GHRepoType } from './types/GHRepoType';
import { GHProfileType } from './types/GHProfileType';


const fetchRepos = async (): Promise<GHRepoType[]> => {
  const rawRepos = await fetch('https://api.github.com/users/avesk/repos')
    .then((res) => res.json())
    .catch((err) => console.log(err));
  console.log(rawRepos);

  const filterRepos = (repos: GHRepoType[]): GHRepoType[] => filter(
    repos, 
    (repo: GHRepoType) => includes(['RSCS', 'react-synth-js', 'echo-synth', 'bot-selection-interface', 'avery-portfolio'], repo.name)
  );
  const stripRepos = (repos: GHRepoType[]): GHRepoType[] => map(
    repos, 
    (repo: GHRepoType): GHRepoType => pick(repo, ['name', 'url', 'description'])
  );
  console.log(filterRepos(rawRepos));

  return flow(
    filterRepos,
    stripRepos,
  )(rawRepos);
}; 

const fetchGHProfile = async (): Promise<GHProfileType> => {
  const profile = await fetch('https://api.github.com/users/avesk')
    .then((res) => res.json())
    .catch((err) => console.log(err));
  console.log(profile);
  return { avatarUrl: profile.avatar_url, htmlUrl: profile.html_url };
}

export { fetchRepos, fetchGHProfile };
