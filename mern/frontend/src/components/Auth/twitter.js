import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useState
import { FaHeart, FaRetweet, FaChevronLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import {FaXTwitter} from 'react-icons/fa6';

function TwitterPage() {
    const [tweets, setTweets] = useState([]); // Initialize the tweets state
    const navigate = useNavigate();
    const location = useLocation();
    const prevLocation = useRef(location.pathname); // Store the previous path

    useEffect(() => {
        const fetchUrl = location.state?.jsonFile || '/x/merged_output.json';
        fetch(fetchUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Update state with fetched tweet data
                setTweets(data.map(tweet => ({
                    id: tweet.Tweet_Link,
                    content: tweet.Text,
                    likes: tweet.Likes,
                    retweets: tweet.Retweets,
                    twitterUrl: tweet.Tweet_Link,
                })));
            })
            .catch((error) => console.error('Error fetching tweets:', error));
    }, []);

    const handleCardClick = (url) => {
        window.open(url, '_blank'); // Open tweet in a new tab
    };

    // Inline styles for dark theme and grid layout (3 tweets per row)
    const styles = {
        page: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#000',
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
            backgroundColor: '#1a1a1a',
            padding: '10px',
            borderBottom: '1px solid #333',
        },
        avatar: {
            borderRadius: '50%',
        },
        name: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
        },
        backButton: {
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#6f77ff',
            fontSize: '1.5rem',
            cursor: 'pointer',
        },
        tweetsSection: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            padding: '20px',
            width: '100%',
        },
        card: {
            backgroundColor: '#1a1a1a',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            width: '400px', // Slightly wider card like Twitter's timeline
            padding: '15px',
            textAlign: 'left',
        },
        cardHover: {
            transform: 'translateY(-5px)',
        },
        content: {
            margin: '10px 0',
            fontSize: '16px',
            color: '#d9d9d9',
            lineHeight: '1.5',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '10px',
            marginTop: '15px',
            borderTop: '1px solid #333',
            color: '#8899a6',
        },
        icons: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
        },
        icon: {
            marginRight: '8px',
        },
        iconText: {
            fontSize: '14px',
        },
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
                <FaXTwitter style={styles.avatar} size={60} color="#fff" />
                <h1 style={styles.name}> X Feed</h1>
            </header>
            <section style={styles.tweetsSection}>
                {tweets.map((tweet) => (
                    <div 
                        key={tweet.id} 
                        style={styles.card} 
                        onClick={() => handleCardClick(tweet.twitterUrl)}
                    >
                        <p style={styles.content}>{tweet.content}</p>
                        <div style={styles.footer}>
                            <div style={styles.icons}>
                                <FaHeart style={styles.icon} />
                                <span style={styles.iconText}>{tweet.likes}</span>
                            </div>
                            <div style={styles.icons}>
                                <FaRetweet style={styles.icon} />
                                <span style={styles.iconText}>{tweet.retweets}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default TwitterPage;
