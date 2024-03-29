import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
SEARCH_USERS,
GET_USER,
CLEAR_USERS,
GET_REPOS,
SET_LOADING} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId='REACT_APP_GITHUB_CLIENT_ID';
  githubClientSecret ='REACT_APP_GITHUB_CLIENT_SECRET';
} else {
  githubClientId='GITHUB_CLIENT_ID';
  githubClientSecret ='GITHUB_CLIENT_SECRET';
}

const GithubState = (props)=>{
  const initialState ={
    users: [],
    user: {},
    repos: [],
    loading: false
  }
const [state, dispatch] = useReducer(GithubReducer, initialState);

//search Users
const searchUsers = async text => {
  setLoading();
  const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${githubClientId}&
    client_secret=${githubClientSecret}`);
    //dispatches the payload to the reducer which will update the state and send it to components that need it
  dispatch({
    type: SEARCH_USERS,
    payload: res.data.items
  })

};
//Get user
const getUser = async (username) => {
  setLoading();
  const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
dispatch({
  type: GET_USER,
  payload: res.data
})
};

//Get repos
const getUserRepos = async (username) => {
  setLoading();
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
  dispatch({
    type: GET_REPOS,
    payload: res.data
  })
};
//Clear users
const clearUsers = () => dispatch({type: CLEAR_USERS})
//Set Loading
const setLoading = () => {
  dispatch({type:SET_LOADING});
}


return (<GithubContext.Provider
  value = {{
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    searchUsers,
    clearUsers,
    getUser,
    getUserRepos
  }}>

  {props.children}
</GithubContext.Provider>)

}

export default GithubState
