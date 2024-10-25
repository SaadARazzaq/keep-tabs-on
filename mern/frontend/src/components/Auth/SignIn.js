import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/SignIn.css';
import logo from '../../assets/dp.png';
import emailIcon from '../../assets/email-icon.png';
import mainImage from '../../assets/mainimage.png';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        if (email && password) {
            // Create a data object to send to the backend
            const data = { email, password };

            // Send POST request to the backend using fetch
            fetch('http://localhost:4001/createuser/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid credentials'); // Throw error if response is not ok
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                console.log('Login successful:', data);
                // Handle successful login (e.g., navigate to another page)
                navigate('/all-digests', { state: { email } }); // Pass email to createdigest page
            })
            .catch(error => {
                console.error('Error during sign-in:', error);
                setErrorMessage('Wrong email or password. Please try again.'); // Set error message
                setIsFormValid(false); // Mark form as invalid
            });
        } else {
            setIsFormValid(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCreateAccountClick = () => {
        navigate('/signup');
    };

    const handleRecoverPasswordClick = () => {
        navigate('/forgotpassword');
    };

    return (
        <div className="signin-page">
            <div className="signin-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-image" />
                </div>
                <div className="signin-content">
                    <h2 className="signin-title">Sign in</h2>
                    <p className="signin-subtitle">Enter your account details</p>
                    <form onSubmit={handleSignIn} className="signin-form">
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
                                className={!isFormValid && !email ? 'input-error' : ''} 
                            />
                        </div>
                        <div className="input-group">
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
                                className={!isFormValid && !password ? 'input-error' : ''}
                            />
                        </div>
                        <div className="signin-options">
                            <label>
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <button 
                                onClick={handleRecoverPasswordClick}
                                className="recover-password"
                            >
                                Recover password
                            </button>
                        </div>
                        <button type="submit" className="signin-button">Sign In</button>
                    </form>
                    {!isFormValid && <p className="error-message">{errorMessage}</p>}
                    <p className="signin-footer">
                        You don’t have an account? <button onClick={handleCreateAccountClick} className="create-account-link">Create an account</button>
                    </p>
                </div>
            </div>
            <div className="image-container">
                <img src={mainImage} alt="3D Illustration" className="main-image" />
            </div>
        </div>
    );
}

export default SignIn;
