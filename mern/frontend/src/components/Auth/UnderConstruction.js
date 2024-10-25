import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UnderConstruction = () => {

    const navigate = useNavigate();
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'black',
      color: 'white',
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
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
        padding: '10px',
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
        </header>
    <div style={styles.container}>
      This page is under construction 🤕
    </div>
    </div>
  );
};

export default UnderConstruction;
