import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../assets/styles/ProfilePage.css'; 
import { FaChevronLeft, FaPodcast } from 'react-icons/fa';

function PodcastFeedsPage() {
    const navigate = useNavigate();

    return (
        <div className="profile-page2">
            <header className="profile-header2">
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
                <div className="profile-details2">
                    <FaPodcast className="profile-avatar2" size={120} color="#6f77ff" />
                    <h1 className="profile-name2">Podcast Feeds</h1>
                </div>
            </header>
            <section className="digests-section2">
                <div className="digest-card2">
                    <h2>Latest Podcast Episodes</h2>
                    <p>Stay updated with the latest episodes from your favorite shows.</p>
                    <p><strong>Episodes:</strong> 15</p>
                </div>
            </section>
        </div>
    );
}

export default PodcastFeedsPage;
