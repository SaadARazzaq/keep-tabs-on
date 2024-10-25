import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaInstagram, FaHeart, FaComment, FaShare, FaChevronLeft } from 'react-icons/fa';

const posts = [
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        likes: 120,
        comments: 34,
        shares: 12,
        instagramUrl: 'https://www.instagram.com/p/POSTID1', // Replace with actual Instagram post URL
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 230,
        comments: 45,
        shares: 23,
        instagramUrl: 'https://www.instagram.com/p/POSTID2',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 90,
        comments: 20,
        shares: 10,
        instagramUrl: 'https://www.instagram.com/p/POSTID3',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        likes: 120,
        comments: 34,
        shares: 12,
        instagramUrl: 'https://www.instagram.com/p/POSTID1', // Replace with actual Instagram post URL
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 230,
        comments: 45,
        shares: 23,
        instagramUrl: 'https://www.instagram.com/p/POSTID2',
    },
    {
        id: 7,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 90,
        comments: 20,
        shares: 10,
        instagramUrl: 'https://www.instagram.com/p/POSTID3',
    },
    {
        id: 8,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 9,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 10,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 90,
        comments: 20,
        shares: 10,
        instagramUrl: 'https://www.instagram.com/p/POSTID3',
    },
    {
        id: 11,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 12,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        likes: 120,
        comments: 34,
        shares: 12,
        instagramUrl: 'https://www.instagram.com/p/POSTID1', // Replace with actual Instagram post URL
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 230,
        comments: 45,
        shares: 23,
        instagramUrl: 'https://www.instagram.com/p/POSTID2',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 90,
        comments: 20,
        shares: 10,
        instagramUrl: 'https://www.instagram.com/p/POSTID3',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/300', // Replace with actual post image URL
        likes: 120,
        comments: 34,
        shares: 12,
        instagramUrl: 'https://www.instagram.com/p/POSTID1', // Replace with actual Instagram post URL
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 230,
        comments: 45,
        shares: 23,
        instagramUrl: 'https://www.instagram.com/p/POSTID2',
    },
    {
        id: 7,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 90,
        comments: 20,
        shares: 10,
        instagramUrl: 'https://www.instagram.com/p/POSTID3',
    },
    {
        id: 8,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 9,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 10,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 90,
        comments: 20,
        shares: 10,
        instagramUrl: 'https://www.instagram.com/p/POSTID3',
    },
    {
        id: 11,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    {
        id: 12,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 300,
        comments: 60,
        shares: 15,
        instagramUrl: 'https://www.instagram.com/p/POSTID4',
    },
    // Add more posts as needed
];

function InstagramPage() {
    const navigate = useNavigate();

    const handleCardClick = (url) => {
        window.open(url, '_blank'); // Open Instagram post in a new tab
    };

    // Inline styles for the dark theme and grid layout (3 posts per row)
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
            color: '#E1306C',
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
            width: '300px', // Fixed width for cards to create a consistent grid
            textAlign: 'center',
        },
        cardHover: {
            transform: 'translateY(-5px)',
        },
        image: {
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            display: 'block',
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
                <FaInstagram style={styles.avatar} size={60} color="#E1306C" />
                <h1 style={styles.name}>Instagram</h1>
            </header>
            <section style={styles.postsSection}>
                {posts.map((post) => (
                    <div 
                        key={post.id} 
                        style={styles.card} 
                        onClick={() => handleCardClick(post.instagramUrl)}
                    >
                        <img src={post.imageUrl} alt={`Post ${post.id}`} style={styles.image} />
                        <div style={styles.footer}>
                            <div style={styles.icons}>
                                <FaHeart style={styles.icon} /> {post.likes}
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

export default InstagramPage;