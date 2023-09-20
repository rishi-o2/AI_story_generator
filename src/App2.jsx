import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  headingContainer: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  listItem: {
    marginBottom: '20px',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  prompt: {
    fontWeight: 'bold',
  },
  likeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
  },
  dislikeButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
  },
};

function StoryList() {
  const [stories, setStories] = useState([]);
  const [showReloadMessage, setShowReloadMessage] = useState(false);

  useEffect(() => {
    // Fetch the story data from the server
    axios.get('/stories').then((response) => {
      // Sort stories by likes in descending order
      const sortedStories = response.data.sort((a, b) => b.likes - a.likes);
      setStories(sortedStories);
    });
  }, []);

  const handleLike = async (storyId) => {
    try {
      const response = await axios.post(`/like/${storyId}`);
      if (response.status === 200) {
        // Update the local state to reflect the new number of likes
        const updatedStories = stories.map((story) => {
          if (story._id === storyId) {
            return { ...story, likes: story.likes + 1 };
          }
          return story;
        });
        setStories(updatedStories);
        setShowReloadMessage(true); // Show the reload message

        // Show a success toast message
        toast.success('Liked successfully');
      }
    } catch (error) {
      console.error('Error liking story:', error);
      // Show an error toast message
      toast.error('Error liking story');
    }
  };

  const handleDislike = async (storyId) => {
    try {
      const response = await axios.post(`/dislike/${storyId}`);
      if (response.status === 200) {
        // Update the local state to reflect the new number of dislikes
        const updatedStories = stories.map((story) => {
          if (story._id === storyId) {
            return { ...story, dislikes: story.dislikes + 1 };
          }
          return story;
        });
        setStories(updatedStories);
        setShowReloadMessage(true); // Show the reload message

        // Show a success toast message
        toast.error('Disliked successfully');
      }
    } catch (error) {
      console.error('Error disliking story:', error);
      // Show an error toast message
      toast.error ('Error disliking story');
    }
  };

  const reloadMessage = showReloadMessage && (
    <div style={{ marginTop: '20px', color: 'green' }}>
      Reload to check the leaderboard.
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.headingContainer}>
        <span style={styles.heading}>Story Prompts and Generated Stories</span>
      </div>
      {reloadMessage}
      <ul>
        {stories.map((story, index) => (
          <li key={index} style={styles.listItem}>
            <h3 style={styles.prompt}>Prompt:</h3>
            <p>{story.storyPrompt}</p>
            <h3>Generated Story:</h3>
            <p>{story.generatedStory}</p>
            <button
              style={styles.likeButton}
              onClick={() => handleLike(story._id)}
            >
              <FontAwesomeIcon icon={faThumbsUp} /> Like ({story.likes})
            </button>
            <button
              style={styles.dislikeButton}
              onClick={() => handleDislike(story._id)}
            >
              <FontAwesomeIcon icon={faThumbsDown} /> Dislike ({story.dislikes})
            </button>
          </li>
        ))}
      </ul>

      {/* Render the ToastContainer */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default StoryList;


