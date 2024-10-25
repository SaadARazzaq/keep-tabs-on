import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    FaInstagram, FaYoutube, FaFacebook
} from 'react-icons/fa';

import {FaXTwitter} from 'react-icons/fa6';

const ProfileCard = () => {
    const navigate = useNavigate();
    
    const handleYTClick = () => {
        // 1. Lowercase the user.name and replace spaces with underscores
        const formattedName = user.name.toLowerCase().replace(/ /g, '_');
    
        // 2. Update the navigate call with the formatted name
        navigate('/youtube', { state: { jsonFile: `/youtube/${formattedName}.json` } });
    };

    const handleXClick = () => {
        // 1. Lowercase the user.name and replace spaces with underscores
        const formattedName = user.name.toLowerCase().replace(/ /g, '_');
    
        // 2. Update the navigate call with the formatted name
        navigate('/twitter', { state: { jsonFile: `/x/${formattedName}.json` } });
    };

    const location = useLocation();
    const user = location.state?.user;

    console.log('User data:', user);

    const quotes = [
        "Social media is the new word of mouth.",
        "In a world where you can be anything, be kind online.",
        "Engagement is the cornerstone of social media success.",
        "What we share online defines our digital footprint.",
        "Content is king, but engagement is queen.",
        "The best marketing doesn’t feel like marketing.",
        "Social media is not a media. The key is to listen, engage, and share.",
        "Your vibe attracts your tribe.",
        "Social media is a tool for connection, not just promotion.",
        "The power of social media is it forces necessary change.",
        "Your online presence shapes your reputation.",
        "Social media is a gateway to global conversations.",
        "Every post is a chance to tell your story.",
        "Engagement is the lifeblood of social media.",
        "Your voice matters in the digital landscape.",
        "Be authentic; it attracts the right audience.",
        "A conversation can change everything.",
        "Social media is where creativity meets connection.",
        "The right message can resonate far and wide.",
        "Empathy is the secret ingredient for online engagement.",
        "Social media is a platform for change and growth.",
        "Your brand should feel like a friend online.",
        "Content is the heartbeat of social media.",
        "Don’t just broadcast—connect and converse.",
        "Every interaction has the potential to create impact.",
        "Social media is an opportunity to inspire others.",
        "Create value with every piece of content you share.",
        "Stay true to your mission in the digital world.",
        "Engagement is more powerful than reach.",
        "Your audience is eager for authenticity.",
        "Social media is a tool; how you use it defines its impact.",
        "Build relationships, not just followers.",
        "Creativity can make your brand unforgettable.",
        "In the age of noise, clarity is your competitive edge.",
        "Be a source of inspiration in the digital space.",
        "Social media is a powerful storytelling platform.",
        "Community is built through shared experiences online.",
        "Your digital footprint can open doors to new opportunities.",
        "Every share has the potential to amplify your message.",
        "Curiosity fuels engagement in social media.",
        "Social media is about building bridges, not walls.",
        "Authentic connections lead to lasting relationships.",
        "Your content can spark meaningful discussions.",
        "In social media, relevance is key to engagement.",
        "Celebrate diversity in your online community.",
        "Encourage dialogue and foster understanding.",
        "Every post reflects your values and vision.",
        "Social media can transform your brand narrative.",
        "Your story can empower others to share theirs.",
        "Engagement is a dialogue, not a monologue.",
        "Harness the power of visuals to captivate your audience.",
        "Social media can create a sense of belonging.",
        "Be proactive in nurturing your online relationships.",
        "Social media is an endless canvas for creativity.",
        "Innovation is crucial for standing out online.",
        "Authenticity breeds loyalty in social media.",
        "Engage with intention and purpose.",
        "Your audience is your best advocate.",
        "Create content that resonates with your values.",
        "The digital space thrives on genuine connections.",
        "Empower your audience by sharing knowledge and insights.",
        "In the realm of social media, curiosity leads to connection.",
        "A single post can inspire a movement.",
        "Social media is a platform for voices that need to be heard.",
        "Success in social media is about building a loyal community."
    ];
    
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1b1b1b',
    }}>
        <div style={{
            width: '85vw',
            height: '85vh',
            backgroundColor: '#2a2a40',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#e6e6fa',
            padding: '2rem',
            position: 'relative', // To position the back button
        }}>
            {/* Back button */}
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
            <img
                src={user.avatar}
                alt="Profile"
                style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '150px',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                    border: '3px solid #a38ec7',
                    objectFit: 'cover',
                }}
            />

        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{user.name}</h2>
        <h1 style={{fontSize: '4.5rem', marginTop: -3, marginBottom: -20, color: '#ED9204'  }}>❝</h1>
        <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '1.5rem' }}>{getRandomQuote()}</p>
        <div style={{
          display: 'flex',
          gap: '1rem',
        }}>
          <button style={{
            backgroundColor: '#3b5998',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}><FaFacebook /></button>
          <button style={{
            backgroundColor: '#E1306C',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}><FaInstagram /></button>
          <button onClick={handleYTClick} style={{
            backgroundColor: '#FF0000',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}><FaYoutube /></button>
          <button onClick={handleXClick} style={{
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}><FaXTwitter /></button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;