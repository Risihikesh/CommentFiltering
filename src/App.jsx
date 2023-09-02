import React, { useState, useEffect } from 'react';
import './App.css';
import CommentList from './CommentsList';

function App() {
  // State for storing comments and selected postId
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [filteredComments, setFilteredComments] = useState([]);
  const [availablePostIds, setAvailablePostIds] = useState([]);

  // Fetching api
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        // Extract unique postIds and set them as availablePostIds
        const uniquePostIds = Array.from(new Set(data.map((comment) => comment.postId)));
        setAvailablePostIds(uniquePostIds);
      });
  }, []);

  
  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  // Handle filter input change by user
  const handleFilterChange = (postId) => {
    if (!postId) {
      setFilteredComments([]);
    } else {
      const filtered = comments.filter(
        (comment) => comment.postId.toString() === postId.toString()
      );
      setFilteredComments(filtered);
    }
  };

  return (
    <div className="App">
      <div className="left-panel">
        <h2>Posts</h2>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by postId"
            onChange={(e) => handleFilterChange(e.target.value)}
          />
          <select
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">All Posts</option>
            {availablePostIds.map((postId) => (
              <option key={postId} value={postId}>
                Post Id {postId}
              </option>
            ))}
          </select>
        </div>
        <CommentList
          comments={filteredComments.length > 0 ? filteredComments : comments}
          onPostClick={handlePostClick}
        />
      </div>
      <div className="right-panel">
        <h2>Comments</h2>
        {selectedPostId && (
          <div>
            <h3>Comments for PostID {selectedPostId}</h3>
            <ul>
              {comments
                .filter((comment) => comment.postId === selectedPostId)
                .map((comment) => (
                  <li key={comment.id}>{comment.body}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
