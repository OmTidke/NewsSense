import React, {useContext, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userContext } from "../App";
import axios from 'axios';


export default function SingleNews(props) {
  const { '*': url } = useParams();
  const user = useContext(userContext);
  const [mesg, setMesg] = useState('');
  const email = user.email;
  const handleSaveSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4001/singlenews/*', {email, url})
    .then(result => {
        console.log(result);
        alert(result.data);
        setMesg(result.data)})
    .catch(err => console.log(err));
}
  return (
    <div className='container'>
      {/* <p>URL: {url}</p> */}
      
      {/* <h2>{props.title}</h2>
      <h5>{(props.description.description)}</h5>
      <p>{JSON.stringify(props.description)}</p> */}
      <Link to={url}>Go to website</Link>
      {user.email ?(
        <button className='btn btn-success mx-5 my-3' onClick={handleSaveSubmit}>Save</button>
      )
    : null}
    <p>{mesg}</p>
      <iframe title="External Content" src={url} width="100%" height="800"></iframe>
    </div>
  );
}
