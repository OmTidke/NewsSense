import React, {useContext,  useEffect, useState} from 'react';
import { userContext } from "../App";
import axios from 'axios';

export default function SavedNews(props) {

  const user = useContext(userContext);
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch saved news
    axios.get('http://localhost:4001/fetchSavedNews')
      .then(response => {
        setSavedNews(response.data);
      })
      .catch(error => {
        console.error('Error fetching saved news:', error);
      });
  }, []); // Empty dependency array to ensure it runs only once


  return (
    <div className='container'>
      <h2>Saved News</h2>
      {savedNews.map((news, index) => (
        <div key={index}>
        {/* Use an anchor tag to open the URL in a new tab */}
       
        <a href={news.url} target="_blank" rel="noopener noreferrer">
          {news.url}
        </a>
        </div>
      ))}
    </div>
  );
}