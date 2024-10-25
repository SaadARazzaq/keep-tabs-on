import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import '../../assets/styles/CreateDigest.css';
import { FaRegClock, FaPlusSquare, FaChevronDown, FaEllipsisH, FaChevronLeft, FaGlobe, FaCog } from 'react-icons/fa'; 
import SocialMediaProfile from './SocialMediaProfile.json';

function CreateDigest() {
    const [jsonData, setJsonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [xUrl, setXUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [frequency, setFrequency] = useState(['Weekly']);
    const [days, setDays] = useState(['M', 'W', 'F']);
    const [darkMode, setDarkMode] = useState(true); 
    const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility

    const navigate = useNavigate();
    const location = useLocation(); // Extract location
    const email = location.state?.email || ''; // Retrieve the email from state
    const email1 = location.state?.email1 || ''; // Retrieve the fallback email from state (in case email is not present)

    // Effect for fetching data when the component mounts
    useEffect(() => {
        setJsonData(SocialMediaProfile);
        setLoading(false);

        if (email || email1) {
            setShowPopup(true); // Show popup if email or email1 is received
        }
    }, [email, email1]);
    const goToProfilePage = () => {
        navigate('/profile'); // Assuming '/profile' is the correct route
    };
    
    const handleReset = () => {
        setName('');
        setAvatar('');
        setFacebookUrl('');
        setInstagramUrl('');
        setXUrl('');
        setYoutubeUrl('');
        setFrequency([]);
        setDays([]);
    };

    const handleNameChange = (selectedName) => {
        setName(selectedName);
        const selectedUser = jsonData.find((item) => item.name === selectedName);
        if (selectedUser) {
            setAvatar(selectedUser.avatar || '');
            setFacebookUrl(selectedUser.facebookUrl || '');
            setInstagramUrl(selectedUser.instagramUrl || '');
            setXUrl(selectedUser.xUrl || '');
            setYoutubeUrl(selectedUser.youtubeUrl || '');
        }
    };

    const handleCreateDigest = () => {
        if (!name || !facebookUrl || !instagramUrl || !xUrl || !youtubeUrl) {
            alert('Please select values for all fields.');
            return;
        }

        const emailToSend = email || email1;

        if (!emailToSend) {
            alert('No email provided.');
            return;
        }

        const newDigest = {
            name,
            avatar: avatar,
            facebookUrl,
            instagramUrl,
            xUrl,
            youtubeUrl,
            email: emailToSend,
            digestCreated: new Date()
        };

        // Check if the item is already present in the database for this email
        fetch(`http://localhost:4001/all-digests-profiles?email=${emailToSend}&name=${name}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // Item already exists
                    alert('This digest already exists for the given email.');
                } else {
                    // If not duplicate, proceed with saving the digest
                    saveAlldigests(newDigest);
                    navigate('/all-digests', { state: { email: emailToSend } });
                }
            })
            .catch(error => {
                console.error('Error checking for duplicate:', error);
            });
    };

    const saveAlldigests = (data) => {
        console.log(data);
        fetch('http://localhost:4001/all-digests-profiles', {  // Update URL to point to new backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save the digest');
            }
            console.log('Digest saved successfully');
        })
        .catch(error => {
            console.error('Error saving the digest:', error);
        });
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('light-mode', !darkMode);
    };

    const closePopup = () => {
        setShowPopup(false); // Close the popup
    };

    if (loading) {
        return <div>Loading data...</div>;
    }

    return (
        <div className={`digest-page ${darkMode ? 'dark' : 'light'}`}>
            {/* Show the popup when the state is true */}
            {/* {!showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Welcome! You signed in with: {email || email1}</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )} */}
            {/* Sidebar and main content code remains the same */}
            <section className="form-section">
                <h2>Create a New Digest</h2>
                <form onSubmit={handleCreateDigest} className="digest-form">
                    <select value={name} onChange={(e) => handleNameChange(e.target.value)}>
                        <option value="">Select Name or Business</option>
                        {jsonData.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    {/* Other fields will be auto-filled based on selection */}
                    <select value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)}>
                        <option value="">Select Facebook URL</option>
                        <option value={facebookUrl}>{facebookUrl}</option>
                    </select>
                    <select value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)}>
                        <option value="">Select Instagram URL</option>
                        <option value={instagramUrl}>{instagramUrl}</option>
                    </select>
                    <select value={xUrl} onChange={(e) => setXUrl(e.target.value)}>
                        <option value="">Select X URL</option>
                        <option value={xUrl}>{xUrl}</option>
                    </select>
                    <select value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)}>
                        <option value="">Select YouTube URL</option>
                        <option value={youtubeUrl}>{youtubeUrl}</option>
                    </select>

                    <div className="form-actions">
                        <button type="button" className="reset-button" onClick={handleReset}>
                            Reset
                        </button>
                        <button type="button" className="create-button" onClick={handleCreateDigest}>
                            Create Digest
                        </button>
                    </div>
                </form>
            </section>
        </div>
        
    );
}

export default CreateDigest;
