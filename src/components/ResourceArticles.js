import React, { useState } from 'react';
import axios from 'axios';
import '../css/ResourceArticles.css';

const ResourceArticles = () => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://budget-buddies.glitch.me/resources', {
        params: {
          input: searchInput
        }
      });

      if (response.data.data) {
        // Only take the first three articles
        setArticles(response.data.data.slice(0, 3));
        setErrorMessage('');
      } else {
        setArticles([]);
        setErrorMessage('No articles found. Try another search.');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setErrorMessage('An error occurred while fetching articles');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="searchInput">Enter keywords to search for articles:</label>
          <input
            type="text"
            id="searchInput"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search for articles regarding budgeting, finance, etc."
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="articles-container">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <h3>{article.title}</h3>
            <p><b>Author:</b> {article.author || 'N/A'}</p>
            <p><b>Published At:</b> {article.publishedAt}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            <img src={article.urlToImage} alt={article.title} style={{width: '100%', marginTop: '10px'}} />
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceArticles;
