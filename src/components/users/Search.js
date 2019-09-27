import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

//props in func comp comes from argument
const Search = ({setAlert}) => {
  //to init state you destructure an array with your state name, the set function named set+your state = a useState() function with default value as argument
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext)

  const [text, setText] = useState('');

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert("Please, enter search string", 'light');
    } else {
    githubContext.searchUsers(text);
      setText("");
    }
  };

  return (<div>
    <form onSubmit={onSubmit} className='form'>
      <input type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange}/>
      <input type="submit" name="Search" className="btn btn-dark btn-block"/>
    </form>
    {githubContext.users.length>0 && <button className=" btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
  </div>);
}

Search.propTypes = {
  setAlert: PropTypes.func.isRequired
}
export default Search;
