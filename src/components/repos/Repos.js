import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';


const Repos =({repos})=> {

    return repos.map(repo => <RepoItem repo={repo} key={repo.id}/>);
}
Repos.propTypes = {
  repos: PropTypes.object.isRequired,
};
export default Repos
