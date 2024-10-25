import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaThumbsUp, FaComment, FaShare, FaChevronLeft } from 'react-icons/fa';

const posts = [
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        content: 'This is Facebook post 1',
        likes: 120,
        comments: 34,
        shares: 12,
        facebookUrl: 'https://facebook.com/post1', // Replace with actual Facebook post URL
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 2',
        likes: 230,
        comments: 45,
        shares: 23,
        facebookUrl: 'https://facebook.com/post2',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 3',
        likes: 90,
        comments: 20,
        shares: 10,
        facebookUrl: 'https://facebook.com/post3',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 4',
        likes: 300,
        comments: 60,
        shares: 15,
        facebookUrl: 'https://facebook.com/post4',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 5',
        likes: 500,
        comments: 200,
        shares: 80,
        facebookUrl: 'https://facebook.com/post5',
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 6',
        likes: 250,
        comments: 90,
        shares: 40,
        facebookUrl: 'https://facebook.com/post6',
    },
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        content: 'This is Facebook post 1',
        likes: 120,
        comments: 34,
        shares: 12,
        facebookUrl: 'https://facebook.com/post1', // Replace with actual Facebook post URL
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 2',
        likes: 230,
        comments: 45,
        shares: 23,
        facebookUrl: 'https://facebook.com/post2',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 3',
        likes: 90,
        comments: 20,
        shares: 10,
        facebookUrl: 'https://facebook.com/post3',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 4',
        likes: 300,
        comments: 60,
        shares: 15,
        facebookUrl: 'https://facebook.com/post4',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 5',
        likes: 500,
        comments: 200,
        shares: 80,
        facebookUrl: 'https://facebook.com/post5',
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 6',
        likes: 250,
        comments: 90,
        shares: 40,
        facebookUrl: 'https://facebook.com/post6',
    },
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        content: 'This is Facebook post 1',
        likes: 120,
        comments: 34,
        shares: 12,
        facebookUrl: 'https://facebook.com/post1', // Replace with actual Facebook post URL
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 2',
        likes: 230,
        comments: 45,
        shares: 23,
        facebookUrl: 'https://facebook.com/post2',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 3',
        likes: 90,
        comments: 20,
        shares: 10,
        facebookUrl: 'https://facebook.com/post3',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 4',
        likes: 300,
        comments: 60,
        shares: 15,
        facebookUrl: 'https://facebook.com/post4',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 5',
        likes: 500,
        comments: 200,
        shares: 80,
        facebookUrl: 'https://facebook.com/post5',
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 6',
        likes: 250,
        comments: 90,
        shares: 40,
        facebookUrl: 'https://facebook.com/post6',
    },
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        content: 'This is Facebook post 1',
        likes: 120,
        comments: 34,
        shares: 12,
        facebookUrl: 'https://facebook.com/post1', // Replace with actual Facebook post URL
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 2',
        likes: 230,
        comments: 45,
        shares: 23,
        facebookUrl: 'https://facebook.com/post2',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 3',
        likes: 90,
        comments: 20,
        shares: 10,
        facebookUrl: 'https://facebook.com/post3',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 4',
        likes: 300,
        comments: 60,
        shares: 15,
        facebookUrl: 'https://facebook.com/post4',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 5',
        likes: 500,
        comments: 200,
        shares: 80,
        facebookUrl: 'https://facebook.com/post5',
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 6',
        likes: 250,
        comments: 90,
        shares: 40,
        facebookUrl: 'https://facebook.com/post6',
    },
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        content: 'This is Facebook post 1',
        likes: 120,
        comments: 34,
        shares: 12,
        facebookUrl: 'https://facebook.com/post1', // Replace with actual Facebook post URL
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 2',
        likes: 230,
        comments: 45,
        shares: 23,
        facebookUrl: 'https://facebook.com/post2',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 3',
        likes: 90,
        comments: 20,
        shares: 10,
        facebookUrl: 'https://facebook.com/post3',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 4',
        likes: 300,
        comments: 60,
        shares: 15,
        facebookUrl: 'https://facebook.com/post4',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 5',
        likes: 500,
        comments: 200,
        shares: 80,
        facebookUrl: 'https://facebook.com/post5',
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 6',
        likes: 250,
        comments: 90,
        shares: 40,
        facebookUrl: 'https://facebook.com/post6',
    },
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        content: 'This is Facebook post 1',
        likes: 120,
        comments: 34,
        shares: 12,
        facebookUrl: 'https://facebook.com/post1', // Replace with actual Facebook post URL
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 2',
        likes: 230,
        comments: 45,
        shares: 23,
        facebookUrl: 'https://facebook.com/post2',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 3',
        likes: 90,
        comments: 20,
        shares: 10,
        facebookUrl: 'https://facebook.com/post3',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 4',
        likes: 300,
        comments: 60,
        shares: 15,
        facebookUrl: 'https://facebook.com/post4',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 5',
        likes: 500,
        comments: 200,
        shares: 80,
        facebookUrl: 'https://facebook.com/post5',
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/300',
        content: 'This is Facebook post 6',
        likes: 250,
        comments: 90,
        shares: 40,
        facebookUrl: 'https://facebook.com/post6',
    },
    // Add more posts as needed
];

function FacebookPage() {
    const navigate = useNavigate();

    const handleCardClick = (url) => {
        window.open(url, '_blank'); // Open Facebook post in a new tab
    };

    // Inline styles for dark theme and grid layout (3 posts per row)
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
            color: '#4267B2',
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
        postsSection: {
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
            width: '300px', // Fixed width for posts to create a consistent grid
            textAlign: 'center',
            padding: '15px',
        },
        cardHover: {
            transform: 'translateY(-5px)',
        },
        image: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
        },
        content: {
            margin: '15px 0',
            fontSize: '16px',
            color: '#fff',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px',
            backgroundColor: '#1a1a1a',
            borderTop: '1px solid #333',
        },
        icons: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
        },
        icon: {
            marginRight: '5px',
            color: '#fff',
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
                <FaFacebook style={styles.avatar} size={60} color="#4267B2" />
                <h1 style={styles.name}>Facebook</h1>
            </header>
            <section style={styles.postsSection}>
                {posts.map((post) => (
                    <div 
                        key={post.id} 
                        style={styles.card} 
                        onClick={() => handleCardClick(post.facebookUrl)}
                    >
                        <img src={post.imageUrl} alt={`Post ${post.id}`} style={styles.image} />
                        <p style={styles.content}>{post.content}</p>
                        <div style={styles.footer}>
                            <div style={styles.icons}>
                                <FaThumbsUp style={styles.icon} /> {post.likes}
                                <FaComment style={styles.icon} /> {post.comments}
                                <FaShare style={styles.icon} /> {post.shares}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default FacebookPage;
