import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaYoutube, FaEye, FaThumbsUp } from 'react-icons/fa';

function YouTubePage() {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const prevLocation = useRef(); // Initialize ref for previous path

    // Update the previous location on every route change
    useEffect(() => {
        prevLocation.current = location.pathname;
    }, [location]);

    useEffect(() => {
        let fetchUrl = '/youtube/merged_output.json'; // Default URL

        // If the previous page was '/profile', fetch the alternative JSON file
        if (prevLocation.current === '/profile') {
            fetchUrl = '/youtube/logan_paul.json';
        }

        // Fetch the appropriate data based on the previous URL
        fetch(fetchUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setVideos(data))
            .catch((error) => console.error('Error fetching videos:', error));
    }, []);

    const handleCardClick = (url) => {
        window.open(url, '_blank');
    };

    const styles = {
        // ... your existing styles here ...
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <button 
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#e6e6fa',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                    }}
                >
                    ← Back
                </button>
                <FaYoutube style={styles.avatar} size={60} color="#FF0000" />
                <h1 style={styles.name}>All Creators Feed</h1> {/* Updated title */}
            </header>
            <section style={styles.postsSection}>
                {videos.map((video) => (
                    <div
                        key={video.id}
                        style={{ ...styles.card, ':hover': styles.cardHover }} // Hover effect
                        onClick={() => handleCardClick(video.videoUrl)}
                    >
                        <div style={styles.imageContainer}>
                            <img src={video.thumbnailUrl} alt={`Video ${video.id}`} style={styles.image} />
                            <FaYoutube style={styles.youtubeIcon} />
                        </div>
                        <div style={styles.title}>{video.title}</div>
                        <div style={styles.footer}>
                            <div style={styles.icons}>
                                <FaEye style={styles.icon} /> {video.views.toLocaleString()}
                                <FaThumbsUp style={styles.icon} /> {video.likes.toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default YouTubePage;
