import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/SignUp.css';
import logo from '../../assets/dp.png';
import emailIcon from '../../assets/email-icon.png';
import mainImage from '../../assets/mainimage2.png';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null); // Store avatar file
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(''); // For storing the error/success message
    const [showPopup, setShowPopup] = useState(false); // To toggle the popup visibility
    const [isSuccess, setIsSuccess] = useState(false); // To differentiate between success and error popups
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        
        // Convert email to lowercase
        const lowercasedEmail = email.toLowerCase();
    
        // Validate that the email ends with '@gmail.com' and follows the correct format
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
        if (!gmailRegex.test(lowercasedEmail)) {
            setMessage('Please enter a valid Gmail address (e.g., user@gmail.com)');
            setIsSuccess(false);
            setShowPopup(true);
            return; // Stop further execution if validation fails
        }
    
        // Ensure an avatar file has been selected
        if (!avatar) {
            setMessage('Please upload an avatar.');
            setIsSuccess(false);
            setShowPopup(true);
            return;
        }
    
        // Create form data for file upload
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', lowercasedEmail);
        formData.append('password', password);
        formData.append('avatar', avatar); // Append avatar file

        console.log("User Data:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        fetch('http://localhost:4001/createuser', {
            method: 'POST',
            body: formData, // Send form data
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    if (errData.message && errData.message.includes('E11000') && errData.message.includes('dup key')) {
                        throw new Error('User already exists');
                    }                    
                    throw new Error('Failed to create user');
                });
            }
            return response.json(); 
        })
        .then(data => {
            console.log('User created:', data);
            setMessage('User Created Successfully');
            setIsSuccess(true); // Set success flag
            setShowPopup(true); // Show the success popup
        })
        .catch(error => {
            console.error('Error creating the user:', error);
            setMessage('User already exists with this email. Please sign in.');
            setIsSuccess(false); // Set error flag
            setShowPopup(true); // Show the error popup
        });
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]); // Store the file in state
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCreateAccountClick = () => {
        navigate('/signin');
    };

    const closePopup = () => {
        setShowPopup(false);
    
        // Check the message content to determine where to navigate
        if (message === 'Please enter a valid Gmail address (e.g., user@gmail.com)') {
            navigate('/signup'); // Stay on signup if validation failed
        } else if (isSuccess) {
            navigate('/signin'); // Navigate to sign-in page on success
        }
    };
    
    return (
        <div className="signin-page">
            <div className="signin-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-image" />
                </div>
                <div className="signin-content">
                    <h2 className="signin-title">Sign Up</h2>
                    <p className="signin-subtitle">Before we start, please enter your email and password</p>
                    <form onSubmit={handleSignUp} className="signin-form">
                        
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-icon">
                                <img src={emailIcon} alt="Email Icon" />
                            </span>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-groupp">
                            <span
                                className="input-icon toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleAvatarChange} // Store the selected file in state
                                required
                            />
                        </div>
                        
                        <div className="signin-options">
                            <label>
                                <input type="checkbox" />
                                I agree to receive email updates
                            </label>
                            <label>
                                <input type="checkbox" />
                                I have read and agree to Terms of Service
                            </label>
                        </div>
                        <button type="submit" className="signin-button">Create Account</button>
                    </form>
                    <p className="signin-footer">
                        Already registered? <button onClick={handleCreateAccountClick} className="create-account-link">Sign in to your account</button>
                    </p>
                </div>
            </div>
            <div className="image-container">
                <img src={mainImage} alt="3D Illustration" className="main-image" />
            </div>

            {/* Error/Success Message Popup */}
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: isSuccess ? '#2e2a3b' : '#2e2a3b',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    zIndex: 9999,
                    width: '300px',
                    textAlign: 'center',
                }}>
                    <p style={{ color: '#a874ff' }}>{message}</p>
                    <button
                        onClick={closePopup}
                        style={{
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#a874ff',
                            border: 'none',
                            borderRadius: '5px',
                            color: '#fff',
                            cursor: 'pointer'
                        }}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignUp;
