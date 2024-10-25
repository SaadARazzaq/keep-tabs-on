import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaYoutube, FaEye, FaThumbsUp, FaChevronLeft } from 'react-icons/fa';

function YouTubePage() {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const prevLocation = useRef(location.pathname); // Store the previous path

    useEffect(() => {

        const fetchUrl = location.state?.jsonFile || '/youtube/merged_output.json';


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
        page: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#121212', // Slightly lighter dark for a polished feel
            minHeight: '100vh',
            color: '#fff',
            padding: '20px',
        },
        header: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#1f1f1f', // Dark but distinguishable from page background
            padding: '15px',
            borderBottom: '2px solid #333',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for header separation
        },
        avatar: {
            borderRadius: '50%',
        },
        name: {
            fontSize: '26px',
            fontWeight: 'bold',
            color: '#FF0000',
            letterSpacing: '1px',
        },
        backButton: {
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#FF0000',
            fontSize: '1.5rem',
            cursor: 'pointer',
        },
        postsSection: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px',
            padding: '20px',
            width: '100%',
        },
        card: {
            backgroundColor: '#1f1f1f',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Slightly more shadow for depth
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            width: '320px', // More consistent width for cards
            textAlign: 'center',
        },
        cardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 20px rgba(0, 0, 0, 0.5)', // Elevates on hover
        },
        imageContainer: {
            position: 'relative',
        },
        image: {
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            display: 'block',
        },
        youtubeIcon: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255, 0, 0, 0.8)',
            fontSize: '4rem',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-around',
            padding: '12px',
            backgroundColor: '#1f1f1f',
            borderTop: '1px solid #333',
        },
        icons: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        icon: {
            marginRight: '5px',
            color: '#fff',
        },
        title: {
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '10px 0',
            padding: '0 10px',
        }
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
                <h1 style={styles.name}> YouTube Feed</h1> {/* Updated title */}
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
