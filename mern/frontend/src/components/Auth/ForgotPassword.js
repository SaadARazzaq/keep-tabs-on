import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/ForgotPassword.css'; // Create this file in the styles folder
import logo from '../../assets/dp.png'; // Adjust the path if your structure is different
import emailIcon from '../../assets/email-icon.png'; // Replace this with your actual email icon path
import mainImage from '../../assets/mainimage3.png'; // The 3D image

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log('Forgot Password:', { email });
        // Implement forgot password logic here (e.g., API call)
    };

    const handleCreateAccountClick = () => {
        navigate('/signin'); // Navigate to the SignIn page
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-image" />
                </div>
                <div className="forgot-password-content">
                    <h2 className="forgot-password-title">Forgot password?</h2>
                    <p className="forgot-password-subtitle">
                        Enter your email below, you will receive an email with instructions on how to reset your password in a few minutes. You can also set a new password if you’ve never set one before.
                    </p>
                    <form onSubmit={handleForgotPassword} className="forgot-password-form">
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
                        <button type="submit" className="forgot-password-button">Enter</button>
                    </form>
                    <p className="forgot-password-footer">
                        Already registered? <button onClick={handleCreateAccountClick} className="signin-link">Sign in to your account</button>
                    </p>
                </div>
            </div>
            <div className="image-container">
                <img src={mainImage} alt="3D Illustration" className="main-image" />
            </div>
        </div>
    );
}

export default ForgotPassword;
